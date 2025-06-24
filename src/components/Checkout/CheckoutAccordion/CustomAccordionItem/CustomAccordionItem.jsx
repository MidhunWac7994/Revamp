import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../components/ui/accordion';
import { CheckCircle } from "lucide-react";
import { cn } from '../../../lib/utils';

const CustomAccordionItem = ({
  title,
  eventKey,
  position,
  jsxComponent,
  disabled = {},
  completed = {},
}) => {
  return (
    <AccordionItem
      data-widget="CustomAccordionItem"
      disabled={disabled[eventKey]}
      value={eventKey}
      className="border-b border-[#EDEDED]"
    >
      <AccordionTrigger
        className={cn(
          "bg-white px-6 py-4 flex items-center justify-between group disabled:opacity-100 text-black data-[state=open]:bg-black data-[state=open]:text-white"
        )}
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
