"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { businessStructureSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useLocalStorage } from "../../hooks/use-local-storage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camped-ui/form";

import { PhoneInput } from "../../lib/PhoneInput";
import { useFormStep } from "../../hooks/use-form-step";
type Inputs = z.infer<typeof businessStructureSchema>;

export default function BusinessStructure() {
  const { saveValueToLocalStorage } = useLocalStorage();
  const form = useForm<z.infer<typeof businessStructureSchema>>({
    resolver: zodResolver(businessStructureSchema),
  });

  const { handleNextStep }: any = useFormStep();

  function onSubmit(values: z.infer<typeof businessStructureSchema>) {
    console.log(values);
    saveValueToLocalStorage("Business Structure", JSON.stringify(values));
    handleNextStep();
  }
  return (
    <div className=" flex flex-col justify-between">
      <div className="">
        <Form {...form}>
          <form
            className="py-8 w-full px-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <div className="gap-y-8 ">
                <div className="flex justify-between gap-2">
                  <div className="mt-2 w-full">
                    <FormField
                      control={form.control}
                      name="firstName"
                      key="firstName"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <FormField
                      control={form.control}
                      name="lastName"
                      key="lastName"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Last Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="email"
                    key="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="address1"
                    key="address1"
                    render={({ field }) => {
                      return (
                        <FormItem className="mb-4">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Adress line 1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address2"
                  key="address2"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Address Line 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  key="city"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="text" placeholder="city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  key="zip"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="text" placeholder="zip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  key="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left mb-4 mt-4">
                        Phone Number
                      </FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="Enter a phone number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mx-auto mt-8 ">
                  Continue
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
