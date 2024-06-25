import { ChevronLeft } from "lucide-react";

import { Button } from "@camped-ui/button"
import { ModeToggle } from "../mode";


   
 

export function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b-2">
      <div className="flex items-center gap-5">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p>Account Verification</p>
        <div className="b-1 bg-gray-100 p-1 rounded-sm">
          <p className="text-indigo-500 text-xs">In progress</p>{" "}
        </div>
      </div>
      <ModeToggle />
    </header>
  );
}
