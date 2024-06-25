import { Header } from "../app/components/header/index";
import { Footer } from "../app/components/Footer/index";

import SampleForm from "./components/sampleForm";
import SampleFormTest from "./components/FormStep/business-representative/businessRepresentative";
import BankDetails from "./components/FormStep/bank-details/bankdetails";
import Authenticate from "./components/FormStep/Authenticator/authenticate";
import { Sidebar } from "./components/Sidebar";
import { FormStepProvider } from "./components/contexts/form-step";
import { FormStep } from "./components/FormStep";

import { useContext, useState } from "react";

export default function Home() {
  return (
    <FormStepProvider>
      <div className="overflow-x-hidden">
        <Header />
        <main
          className={`
          flex flex-col h-screen m-0 
          sm:flex-row sm:m-4 sm:mr-0 sm:h-[calc(100vh-32px)] `}
        >
          <Sidebar />
          <div className="flex flex-1 sm:max-w-[550px] sm:flex-0 sm:ml-[20px]">
            <FormStep />
          </div>
        </main>
      </div>
    </FormStepProvider>
  );
}
