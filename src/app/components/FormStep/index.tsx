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
  },
  {
    step: 2,
    component: BusinessRepresentative,
  },
  {
    step: 3,
    component: BankDetails,
  },
  {
    step: 4,
    component: Authenticate,
  },
  {
    step: 5,
    component: Complete,
  },
];

export function FormStep() {
  const { currentStep } = useFormStep();
  console.log("currentStep", currentStep);

  const step = steps.find(({ step }) => step === currentStep);
  console.log("step", step);

  return (
    <div className="flex flex-col flex-1 justify-between m-3/4">
      {step && step.component()}
    </div>
  );
}
