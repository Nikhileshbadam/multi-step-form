"use client";

import { useState } from "react";

import { z } from "zod";
// import { FormDataSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camped-ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camped-ui/select";



const FormSchema = z.object({});
type Inputs = z.infer<typeof FormSchema>;

export default function Complete() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   trigger,
  //   formState: { errors },
  // } = useForm<Inputs>({
  //   resolver: zodResolver(FormDataSchema),
  // });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <Form {...form}>
          <form className="py-12 w-full mx-4" onSubmit={form.handleSubmit(onSubmit)}>
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>

            <Button type="submit">Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
