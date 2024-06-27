"use client";

import { useState, useEffect } from "react";

import { z } from "zod";
import { authenticateSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";
import {
  Form,
  FormControl,
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

import { useFormStep } from "../../hooks/use-form-step";
import { useLocalStorage } from "../../hooks/use-local-storage";

// const FormSchema = z.object({
//   useSMS: z.string().min(1, "sms is required"),
//   useAuthenticator: z.string().min(1, "authenticator is required"),
// });
type Inputs = z.infer<typeof authenticateSchema>;

export default function Authenticate() {
  const { saveValueToLocalStorage } = useLocalStorage();
  const { handleNextStep }: any = useFormStep();

  const form = useForm<z.infer<typeof authenticateSchema>>({
    resolver: zodResolver(authenticateSchema),
  });
  console.log("values awvawefv", form.getValues());

  function onSubmit(values: z.infer<typeof authenticateSchema>) {
    console.log(values);
    saveValueToLocalStorage("Auth details", JSON.stringify(values));
    handleNextStep();
  }
  return (
    <div className=" inset-0 flex flex-col justify-between p-24">
      <div className="">
        <Form {...form}>
          <form
            className="py-12 w-full px-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <div className="gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="useAuthenticator"
                    key="useAuthenticator"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Use Authenticator"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="useSMS"
                      key="useSMS"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Use SMS"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit">Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
