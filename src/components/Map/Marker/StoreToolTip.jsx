import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/components/ui/tooltip'; 
import { Info } from "lucide-react"; 

const StoreToolTip = ({ storeName, storeAddress }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info
            className="cursor-pointer text-muted-foreground hover:text-black transition duration-300"
            size={16}
          />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="max-w-[220px] bg-black text-white px-3 py-2 rounded-md shadow-lg"
        >
          <p className="text-sm font-normal">{storeName}</p>
          <p className="text-sm font-normal">{storeAddress}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StoreToolTip;
