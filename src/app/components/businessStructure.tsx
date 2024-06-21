"use client";



import logo from "@/public/images/logo.png";
import { Button } from "@camped-ui/button";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camped-ui/form";
import { Input } from "@camped-ui/input";

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name should not be empty",
  }),
  lastName: z.string().min(1, {
    message: "Last name must should not be empty",
  }),
  address: z.string().min(1, {
    message: "address should not be empty",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(8, {
    message: "Invalid number",
  }),
});
export default function BusinessStructure() {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data:any) => {
    console.log(data);
  };
  
  
    
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Enter Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Address Line 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold"></FormLabel>
                  <FormControl>
                    <Input placeholder="Address Line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold"></FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold"></FormLabel>
                  <FormControl>
                    <Input placeholder="Zip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 text-center"
              variant="secondary"
              type="submit"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

