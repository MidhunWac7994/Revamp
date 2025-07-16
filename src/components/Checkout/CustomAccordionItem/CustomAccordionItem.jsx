import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const CustomAccordionItem = ({
  title,
  eventKey,
  position,
  jsxComponent,
  disabled = {},
  completed = {},
}) => {
  // Log props for debugging
  // console.log(`CustomAccordionItem (${eventKey}):`, {
  //   disabled: disabled[eventKey],
  //   completed: completed[eventKey],
  // });

  return (
    <AccordionItem
      data-widget="CustomAccordionItem"
      disabled={disabled[eventKey]}
      value={eventKey}
      className="border w-3xl bg-black border-[#EDEDED] rounded-none"
    >
      <AccordionTrigger
        className={cn(
          "bg-white px-6 py-4  rounded-none flex items-center justify-between group disabled:opacity-100 text-black data-[state=open]:bg-black data-[state=open]:text-white"
        )}
        onClick={() => console.log(`Clicked accordion: ${eventKey}`)}
      >
        <span className="text-18 font-medium flex items-center">
          <span className="border-e border-[#DFDFDF] pe-2 me-2 group-data-[state=open]:border-[#404040]">
            {position}
          </span>
          {title}
          {completed?.[eventKey] && (
            <CheckCircle className="ms-2 text-green-600 w-5 h-5" />
          )}
        </span>
      </AccordionTrigger>

      <AccordionContent className="bg-white px-6 py-8">
        {jsxComponent}
      </AccordionContent>
    </AccordionItem>
  );
};

export default CustomAccordionItem;
