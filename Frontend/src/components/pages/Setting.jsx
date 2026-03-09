import { ChevronLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../common/Button";

export const Setting = () => {
  return (
    <div className="min-h-screen w-full relative px-40 py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <div className="flex items-center gap-6 bg-purple-500s mb-10">
        <Link to="/home">
          <ChevronLeft size={50} className="pt-1" />
        </Link>
        <h4 className="tracking-wider text-4xl text-center w-full">Settings</h4>
      </div>
      {/* Accordion code */}
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`text-xl hover:no-underline cursor-pointer [&>svg]:h-8 [&>svg]:w-8`}
          >
            Profile
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger
            className={`text-xl hover:no-underline cursor-pointer [&>svg]:h-8 [&>svg]:w-8`}
          >
            Conversations
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger
            className={`text-xl hover:no-underline cursor-pointer [&>svg]:h-8 [&>svg]:w-8`}
          >
            Projects
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger
            className={`text-xl hover:no-underline cursor-pointer [&>svg]:h-8 [&>svg]:w-8`}
          >
            Terms and Policies
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Logout Button */}
      <Button
        to="/"
        variant="danger"
        className="w-56 mx-auto absolute bottom-20 right-150"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};
