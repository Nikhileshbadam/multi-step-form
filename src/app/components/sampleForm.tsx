"use client";

import { useState } from "react";

import { z } from "zod";
import { FormDataSchema } from "../components/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: [
      "firstName",
      "lastName",
      "email",
      "state",
      "city",
      "street",
      "phone",
      "zip",
    ],
  },
  {
    id: "Step 2",
    name: "Bank Details",
    fields: ["currency", "country", "Iban", "confirmIban"],
  },
  {
    id: "Step 3",
    name: "2-step authentication",
    fields: ['useSMS', 'useAuthenticator'],
  },
  {
    id: "Step 4",
    name: "Complete",
    
  },
];

export default function SampleForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    console.log("step", currentStep);
    console.log("step", previousStep);
    
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length) {
      if (currentStep === steps.length-2) {
        console.log('submitted')
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-24">
      <div className="lg:flex lg:gap-32">
        <div>
          <nav aria-label="Progress">
            <ol role="list" className="">
              {steps.map((step, index) => (
                <li key={step.name} className="lg:flex-1">
                  {currentStep > index ? (
                    <div className="group flex w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0  md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-sky-600 transition-colors ">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  ) : currentStep === index ? (
                    <div
                      className="flex w-full flex-col border-l-4  py-2 pl-4 md:border-l-0  md:pb-0 md:pl-0 md:pt-4"
                      aria-current="step"
                    >
                      <span className="text-sm font-medium text-sky-600">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group flex w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0  md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-gray-500 transition-colors">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form */}
        <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide your personal details.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.firstName?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.lastName?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="phone"
                      {...register("phone")}
                      autoComplete="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phone?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="street"
                      {...register("street")}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.street?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.street.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="city"
                      {...register("city")}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="state"
                      {...register("state")}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.state?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="zip"
                      {...register("zip")}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.zip?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prev}
                    disabled={currentStep === 0}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Bank Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter your Bank Details
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country")}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    {errors.country?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Currency
                  </label>
                  <div className="mt-2">
                    <select
                      id="currency"
                      {...register("currency")}
                      autoComplete="currency-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>INR</option>
                      <option>EUR</option>
                      <option>US Dollar</option>
                    </select>
                    {errors.currency?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Iban
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="Iban"
                      {...register("Iban")}
                      autoComplete="Iban"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.Iban?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.Iban.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Iban
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="confirmIban"
                      {...register("confirmIban")}
                      autoComplete="confirmIban"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {/* <Input
                      type="text"
                      id="confirmIban"
                      autoComplete="confirmIban"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      {...register("confirmIban", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("Iban") != val) {
                            return "Iban and confirmIban  do no match";
                          }
                        },
                      })}
                    /> */}
                    {errors.confirmIban?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.confirmIban.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prev}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                2-step Authentication
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Keep your account secure
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="useSMS"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                     SMS
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="useSMS"
                      {...register("useSMS")}
                      autoComplete="useSMS"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.useSMS?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.useSMS.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Authenticator
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="useAuthenticator"
                      {...register("useAuthenticator")}
                      autoComplete="useAuthenticator"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.useAuthenticator?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.useAuthenticator.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prev}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
              <div className="mt-8 pt-5">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prev}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
