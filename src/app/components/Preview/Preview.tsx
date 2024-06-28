


// "use client";
// import { useEffect, useState } from "react";
// import { useLocalStorage } from "../hooks/use-local-storage";

// export function Preview() {
//   const { getValueFromLocalStorage } = useLocalStorage();
  

//     const businesStructureData: any = getValueFromLocalStorage(
//       "business structure details"
//     );
//     const authData: any = getValueFromLocalStorage("Auth details") as any;
//     const businessRepData: any = getValueFromLocalStorage(
//       "business representative details"
//     ) as any;
//     const bankData: any = getValueFromLocalStorage("Bank details") as any;
    

//   return (
//     <div>
//       <h2>Review your details before submitting!</h2>
//       <div>
//         {Object.entries(businesStructureData).map(([key, value]: any) => (
//           <p key={key}>
//             <strong>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:
//             </strong>{" "}
//             {value}
//           </p>
//         ))}
//       </div>
//       <div className="mt-4">
//         {Object.entries(businessRepData).map(([key, value]: any) => (
//           <p key={key}>
//             <strong>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:
//             </strong>{" "}
//             {value}
//           </p>
//         ))}
//       </div>

//       <div className="mt-4">
//         {Object.entries(bankData).map(([key, value]: any) => (
//           <p key={key}>
//             <strong>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:
//             </strong>{" "}
//             {value}
//           </p>
//         ))}
//       </div>
//       <div className="mt-4">
//         {Object.entries(authData).map(([key, value]: any) => (
//           <p key={key}>
//             <strong>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:
//             </strong>{" "}
//             {value}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }








"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camped-ui/dialog";
import { Button } from "@camped-ui/button";
import { ChevronRight } from "lucide-react";
import { useFormStep } from "../hooks/use-form-step";
import toast from "react-hot-toast";






export function Preview() {
      const { getValueFromLocalStorage } = useLocalStorage();
      const [lastStepState ,setlastStepState] = useState(true)
      function checkCurrentStep(){
        setTimeout(() => {
          const lastStep = getValueFromLocalStorage(
            steps[steps.length - 2].title
          );
          console.log("lastStep", lastStep);

          if (lastStep != null) {
            setlastStepState(true);
          } else {
            setlastStepState(false);
          }
        }, 500);
      }
     
       const {  steps } = useFormStep();
        const { handleNextStep }: any = useFormStep();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="submit"
            onClick={checkCurrentStep}
            className="w-full mx-auto mt-8 "
          >
            Continue <ChevronRight />
          </Button>
        </DialogTrigger>
        {lastStepState && (
          <DialogContent className="w-full h-full overflow-y-auto">
            <div className="flex flex-col space-x-2">
              <h2>Review your details before submitting!</h2>
              <div>
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`mb-8 ${
                      step.number === steps.length ? "hidden" : "mt-4"
                    }`}
                  >
                    <h1 className="font-bold mb-4 text-lg">{step.title}</h1>
                    {Object.entries(
                      getValueFromLocalStorage(step.title) || {}
                    ).map(([key, value]: any) => (
                      <div key={key} className="flex mb-2">
                        <span className="font-bold flex-1">
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace(/_/g, " ")}
                        </span>
                        <span className="font-bold mx-2">:</span>
                        <span className="flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Button onClick={handleNextStep} className="px-3">
                <span>Submit</span>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}








