"use client";

import React, { useContext } from "react";
import { FormStepContext, useFormContext } from "../contexts/form-step";
console.log("FormStepContext", FormStepContext.Provider);

export const useFormStep = () => {
  const context = useContext(FormStepContext);

  if (!context) {
    throw new Error("useFormStep must be used within a FormStepProvider");
  }

  return context;
};
