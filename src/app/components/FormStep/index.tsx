"use client";

import { useFormStep } from "../hooks/use-form-step";
import Authenticate from "./Authenticator/authenticate";
import BankDetails from "./bank-details/bankdetails";
import BusinessRepresentative from "./business-representative/businessRepresentative";
import Complete from "./Complete/complete";
import BusinessStructure from "./business-structure/businessStructure";

const steps = [
  {
    step: 1,
    component: BusinessStructure,
    title: "BUSINESS STRUCTURE",
  },
  {
    step: 2,
    component: BusinessRepresentative,
    title: "BUSINESS REPRESENTATIVE",
  },
  {
    step: 3,
    component: BankDetails,
    title: "BANK DETAILS",
  },
  {
    step: 4,
    component: Authenticate,
    title: "2-STEP AUTHENTICATION",
  },
  {
    step: 5,
    component: Complete,
    title: "",
  },
];

export function FormStep() {
  const { currentStep } = useFormStep();
  console.log("currentStep", currentStep);

  const step = steps.find(({ step }) => step === currentStep);
  console.log("step", step);

  return (
    <div className="lg:flex flex-col flex-1 justify-between m-3/4">
      <p className="lg:hidden pl-4 pt-8 font-extrabold"> {step?.title}</p>
      {step && step.component()}
    </div>
  );
}
