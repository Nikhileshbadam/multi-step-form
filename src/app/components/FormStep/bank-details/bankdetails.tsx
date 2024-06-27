"use client";

import { useState, useEffect } from "react";

import { z } from "zod";
import { bankDetailsSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";
import toast from "react-hot-toast";
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
import { useLocalStorage } from "../../hooks/use-local-storage";
import { useFormStep } from "../../hooks/use-form-step";
import {  useWatch } from "react-hook-form";

// const FormSchema = z.object({
//   currency: z.string().min(1, "currency is required"),
//   Iban: z.string().min(1, "Iban is required"),
//   confirmIban: z.string().min(1, "Iban is required"),
//   country: z.string().min(1, "country is required"),
// });
type Inputs = z.infer<typeof bankDetailsSchema>;



export default function BankDetails() {
   const { saveValueToLocalStorage } = useLocalStorage();
  const form = useForm<z.infer<typeof bankDetailsSchema>>({
    resolver: zodResolver(bankDetailsSchema),
  });

 
  

 
   const { handleNextStep }: any = useFormStep();
    const { Iban, confirmIban } =
      form.getValues();
    console.log("values awvawefv", form.getValues());
  function onSubmit(values: z.infer<typeof bankDetailsSchema>) {
    console.log(values);
    if(Iban === confirmIban){
       saveValueToLocalStorage("Bank details", JSON.stringify(values));

       handleNextStep();

    }
    else{
       toast.error("Ibans do not match");
       console.log('not match')
    }
   
  }
  return (
    <div className="  flex flex-col justify-between">
      <div className="">
        <Form {...form}>
          <form
            className=" py-12 w-full px-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <div className="gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="currency"
                    key="currency"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="INR">INR</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="country"
                    key="country"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="Australia">
                                Australia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="Iban"
                    key="Iban"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Iban" {...field} />
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
                      name="confirmIban"
                      key="confirmIban"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Confirm Iban"
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

            <Button type="submit" className="w-full mx-auto mt-8">
              Continue
              <ChevronRight />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
