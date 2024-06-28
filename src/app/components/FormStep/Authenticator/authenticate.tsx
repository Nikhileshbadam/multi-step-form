// "use client";

// import { useState, useEffect } from "react";

// import { z } from "zod";
// import { authenticateSchema } from "../../lib/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Button } from "@camped-ui/button";
// import { ChevronLeft } from "lucide-react";
// import { ChevronRight } from "lucide-react";
// import { Input } from "@camped-ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@camped-ui/form";

// import { useFormStep } from "../../hooks/use-form-step";
// import { useLocalStorage } from "../../hooks/use-local-storage";

// type Inputs = z.infer<typeof authenticateSchema>;

// export default function Authenticate() {
//   const { saveValueToLocalStorage } = useLocalStorage();
//   const { handleNextStep }: any = useFormStep();

//   const form = useForm<z.infer<typeof authenticateSchema>>({
//     resolver: zodResolver(authenticateSchema),
//   });

//   function onSubmit(values: z.infer<typeof authenticateSchema>) {
//     console.log(values);
//     saveValueToLocalStorage("Auth details", JSON.stringify(values));
//     handleNextStep();
//   }
//   return (
//     <div className="flex flex-col justify-between">
//       <div className="">
//         <Form {...form}>
//           <form
//             className="py-16 w-full px-4"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <div>

//                   <FormField
//                     control={form.control}
//                     name="useAuthenticator"
//                     key="useAuthenticator"
//                     render={({ field }) => (
//                       <FormItem className="mb-4">
//                         <FormControl>
//                           <Input
//                             type="text"
//                             placeholder="Use Authenticator"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>

//                     )}
//                   />
//                 </div>

//                     <FormField
//                       control={form.control}
//                       name="useSMS"
//                       key="useSMS"
//                       render={({ field }) => (
//                         <FormItem className="mb-4">
//                           <FormControl>
//                             <Input
//                               type="text"
//                               placeholder="Use SMS"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//             <Button type="submit" className="w-full mx-auto mt-8 ">
//               Continue
//               <ChevronRight />
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

import { z } from "zod";
import { authenticateSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@camped-ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Input } from "@camped-ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camped-ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camped-ui/dialog";

import { useFormStep } from "../../hooks/use-form-step";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { Preview } from "../../Preview/Preview";
import toast from "react-hot-toast";

type Inputs = z.infer<typeof authenticateSchema>;

export default function Authenticate() {
  const { saveValueToLocalStorage } = useLocalStorage();
  const { handleNextStep }: any = useFormStep();

  const form = useForm<z.infer<typeof authenticateSchema>>({
    resolver: zodResolver(authenticateSchema),
  });

  function onSubmit(values: z.infer<typeof authenticateSchema>) {
    console.log(values);
    saveValueToLocalStorage("2-step authentication", JSON.stringify(values));
    handleNextStep();
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <Form {...form}>
          <form
            className="py-16 w-full px-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <FormField
                control={form.control}
                name="useAuthenticator"
                key="useAuthenticator"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Use Authenticator"
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
              name="useSMS"
              key="useSMS"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input type="text" placeholder="Use SMS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mx-auto mt-8 ">
              Continue
              <ChevronRight />
            </Button>
            {/* <Preview /> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
