"use client";

import { useState } from "react";

import { z } from "zod";
import { businessRepresentativeSchema } from "../../lib/schema";
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
import { SelectDemo } from "../../lib/combobox";
import { PhoneInput } from "../../lib/PhoneInput";
import { useFormStep } from "../../hooks/use-form-step";

// const FormSchema = z.object({
//   Type: z.string().min(1, "Type is required"),
//   businessAddress: z.string().min(1, "businessAddress is required"),
//   city: z.string().min(1, "City is required"),
//   address1: z.string().min(1, "address line 1 is required"),
//   address2: z.string().min(1, "address line 2 is required"),
//   zip: z.string().min(1, "Zip is required"),

// });
type Inputs = z.infer<typeof businessRepresentativeSchema>;

export default function BusinessRepresentative() {
  const form = useForm<z.infer<typeof businessRepresentativeSchema>>({
    resolver: zodResolver(businessRepresentativeSchema),
  });


  const { handleNextStep }: any = useFormStep();
  function onSubmit(values: z.infer<typeof businessRepresentativeSchema>) {
    console.log(values);
    handleNextStep();
  }
  return (
    <div className="flex flex-col justify-between">
      <div>
        <Form {...form}>
          <form
            className="py-12 w-full px-4 sm:overflow-x-hidden"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <div className="gap-y-8">
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Registered Business Address" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="America">America</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Type"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type of Address" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Commercial">
                              Commercial
                            </SelectItem>
                            <SelectItem value="Industrial">
                              Industrial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="braddress1"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Address line 1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="braddress2"
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
                  name="brcity"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="text" placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brzip"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="text" placeholder="Zip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
