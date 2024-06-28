import React, { useState } from "react";
import { useFormStep } from "../hooks/use-form-step";

interface StepProps {
  step: {
    number: number;
    title: string;
  };
  isActive?: boolean;
  isCurrent?: boolean;
 
}

export function Step({ step, isActive = false, isCurrent = true }: StepProps) {
  
  const { moveToStep } = useFormStep();
  const handleClick = (stepNumber: any) => {
   


    moveToStep(stepNumber);

  };

  const determineColor = () => {
    if (isActive) return "green";
    if (isCurrent) return "blue";
    return "";
  };

  const bgColor = determineColor();
  

  return (
    <div
      key={step.number}
      onClick={() => handleClick(step.number)}
      className={`flex flex-row items-center justify-start gap-4 p-2 rounded-md transition-all duration-300 ease-in-out  hover:bg-sky-blue/10`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ease-in-out ${
          isActive || (isCurrent && step.number === 5)
            ? "border-green-500 bg-green-500"
            : isCurrent
            ? "border-blue-500 bg-blue-500"
            : ""
        }`}
      >
        <span
          className={`text-lg font-bold transition-colors duration-300 ease-in-out ${
            isActive || isCurrent
              ? "text-white"
              : ""
             
          }`}
        >
          {step.number}
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:gap-1 transition-opacity duration-300 ease-in-out">
        <span
          className={`text-xs font-medium leading-3 transition-colors duration-300 ease-in-out ${
            isActive || (isCurrent && step.number === 5)
              ? "text-green-500"
              : isCurrent
              ? "text-blue-500"
              : ""
          }`}
        >
          STEP {step.number}
        </span>
        <strong
          className={`text-sm font-semibold leading-3 uppercase tracking-wide transition-colors duration-300 ease-in-out `}
        >
          {step.title}
        </strong>
      </div>
    </div>
  );
}


