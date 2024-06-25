"use client";

import { useState } from "react";

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
import { SelectDemo } from "../../lib/combobox";
import { useFormStep } from "../../hooks/use-form-step";
  

// const FormSchema = z.object({
//   useSMS: z.string().min(1, "sms is required"),
//   useAuthenticator: z.string().min(1, "authenticator is required"),
// });
type Inputs = z.infer<typeof authenticateSchema>;


 



export default function Authenticate() {
    const { handleNextStep }:any = useFormStep();
  
  const form = useForm<z.infer<typeof authenticateSchema>>({
    resolver: zodResolver(authenticateSchema),
  });
  
  


  function onSubmit(values: z.infer<typeof authenticateSchema>) {
    console.log(values);
    handleNextStep();
  }
  return (
    <div className=" inset-0 flex flex-col justify-between p-24">
      <div className="">
        <Form {...form}>
          <form
            className="py-12 w-full m-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            
              <div>
              

                <div className="gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <FormField
                      control={form.control}
                      name="useSMS"
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
                  <div className="sm:col-span-2">
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="useAuthenticator"
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
                  </div>
                </div>
              </div>
            
            <Button type="submit">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
