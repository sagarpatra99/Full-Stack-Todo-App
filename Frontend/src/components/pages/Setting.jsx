import { LogOut } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../common/Button";
import { TitleBar } from "../ui/TitleBar";
import { Navbar } from "../ui/Navbar";

export const Setting = () => {
  return (
    <div className="min-h-screen w-full relative px-6 sm:px-40 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">
      <TitleBar t="Settings" />
      {/* Accordion code */}
      <Accordion type="single" collapsible defaultValue="">
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
      <Navbar />
    </div>
  );
};
