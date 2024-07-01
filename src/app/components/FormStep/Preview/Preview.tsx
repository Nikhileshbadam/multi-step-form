"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camped-ui/dialog";
import { Button } from "@camped-ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFormStep } from "../../hooks/use-form-step";
import toast from "react-hot-toast";
import { Form } from "@camped-ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

export function Preview() {
  const { getValueFromLocalStorage, saveValueToLocalStorage } =
    useLocalStorage();
  const FormSchema = z.object({});
  function onSubmit(values: z.infer<typeof FormSchema>) {}
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { steps } = useFormStep();
  const { handleNextStep, handlePreviousStep }: any = useFormStep();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded shadow-lg overflow-y-auto max-h-full text-black">
        <div className="flex flex-col space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="text-center text-2xl mb-4">
                Review your details before submitting!
              </h2>
              <div>
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`mb-8 ${
                      step.number === steps.length ||
                      step.number === steps.length - 1
                        ? "hidden"
                        : "mt-4"
                    }`}
                  >
                    <h1 className="font-bold mb-4 text-lg">{step.title}</h1>
                    {Object.entries(
                      getValueFromLocalStorage(step.title) || {}
                    ).map(([key, value]: any) => (
                      <div key={key} className="flex mb-2">
                        <span className="font-bold flex-1">
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace(/_/g, " ")}
                        </span>
                        <span className="font-bold mx-2">:</span>
                        <span className="flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* <div>
                <h2 className="text-center text-2xl mb-4">
                  Review your details before submitting!
                </h2>
                <div>
                  {Object.entries(getValueFromLocalStorage("Final data")).map(
                    ([title, detail]) => (
                      <div key={title} className="mb-8">
                        <h1 className="font-bold mb-4 text-lg">{title}</h1>
                        {Object.entries(detail).map(([key, value]) => (
                          <div key={key} className="flex mb-2">
                            <span className="font-bold flex-1">
                              {key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/_/g, " ")}
                            </span>
                            <span className="font-bold mx-2">:</span>
                            <span className="flex-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div> */}
              <div className="flex justify-between gap-4">
                <Button onClick={handlePreviousStep} className="w-1/2">
                  <ChevronLeft />
                  Edit
                </Button>
                <Button
                  onClick={handleNextStep}
                  type="submit"
                  className="w-1/2"
                >
                  Submit
                  <ChevronRight />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
