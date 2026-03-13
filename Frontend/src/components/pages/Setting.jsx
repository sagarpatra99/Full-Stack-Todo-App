import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleBar } from "../ui/TitleBar";
import { Navbar } from "../ui/Navbar";

export const Setting = () => {
  return (
    <div className="min-h-screen w-full relative px-4 sm:px-16 lg:px-32 py-6 sm:py-10 bg-linear-to-b from-[#1251A6] to-[#062949] text-white">

      <div className="max-w-3xl mx-auto">
        <TitleBar t="Settings" />

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue=""
          className="mt-4 sm:mt-6 space-y-2"
        >

          <AccordionItem value="item-1">
            <AccordionTrigger
              className="text-lg sm:text-xl hover:no-underline cursor-pointer [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8"
            >
              Profile
            </AccordionTrigger>

            <AccordionContent className="text-sm sm:text-base text-gray-200">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger
              className="text-lg sm:text-xl hover:no-underline cursor-pointer [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8"
            >
              Conversations
            </AccordionTrigger>

            <AccordionContent className="text-sm sm:text-base text-gray-200">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger
              className="text-lg sm:text-xl hover:no-underline cursor-pointer [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8"
            >
              Projects
            </AccordionTrigger>

            <AccordionContent className="text-sm sm:text-base text-gray-200">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger
              className="text-lg sm:text-xl hover:no-underline cursor-pointer [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8"
            >
              Terms and Policies
            </AccordionTrigger>

            <AccordionContent className="text-sm sm:text-base text-gray-200">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      <Navbar />
    </div>
  );
};