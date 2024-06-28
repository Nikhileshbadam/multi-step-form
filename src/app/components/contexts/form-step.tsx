"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type FormStepContextData = {
  currentStep: number | 0;
  steps: { title: string; number: number }[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  moveToStep(step: number): void;
};

export const FormStepContext = createContext({
  currentStep: 1,
  steps: [],
  handleNextStep: () => {},
  handlePreviousStep: () => {},
  moveToStep: () => {},
} as FormStepContextData);

interface FormStepProviderProps {
  children: React.ReactNode;
}

export const FormStepProvider = ({ children }: FormStepProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [steps, _] = useState([
    { title: "Business Structure", number: 1 },
    { title: "Business Representative", number: 2 },
    { title: "Bank Details", number: 3 },
    { title: "2-step authentication", number: 4 },
    { title: "Preview", number: 5 },
    { title: "Complete", number: 6 },
  ]);

  const {
    getValueFromLocalStorage,
    saveValueToLocalStorage,
    removeValueFromLocalStorage,
  } = useLocalStorage();

  useEffect(() => {
    const step = getValueFromLocalStorage("currentStep");
    if (step) setCurrentStep(step);
  }, [getValueFromLocalStorage]);

  const handleNextStep = () => {
    const newStepValue = currentStep + 1;

    if (currentStep < steps.length) {
      let max = 0;
      if (currentStep > max) {
        max = currentStep;
        saveValueToLocalStorage("max", `${max}`);
        console.log("max", max);
      }
      setCurrentStep(newStepValue);
      saveValueToLocalStorage("currentStep", `${newStepValue}`);
    } else {
      removeValueFromLocalStorage("Business Structure");
      removeValueFromLocalStorage("Business Representative");
      removeValueFromLocalStorage("Bank Details");
      removeValueFromLocalStorage("2-step authentication");
      removeValueFromLocalStorage("max");

      setCurrentStep(1);
      saveValueToLocalStorage("currentStep", `1`);
    }
  };

  const handlePreviousStep = () => {
    const newStepValue = currentStep - 1;
    if (currentStep > 1) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage("currentStep", `${newStepValue}`);
    }
  };

  const moveToStep = (step: number) => {
    const max = getValueFromLocalStorage("max");
    if (step <= steps.length - 1 && step <= max + 1) {
      setCurrentStep(step);
      saveValueToLocalStorage("currentStep", `${step}`);
    }
  };

  return (
    <FormStepContext.Provider
      value={{
        steps,
        currentStep,
        handleNextStep,
        handlePreviousStep,
        moveToStep,
      }}
    >
      {children}
    </FormStepContext.Provider>
  );
};

export function useFormContext() {
  return useContext(FormStepContext);
}
