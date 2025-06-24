import { cn } from  "../../components/lib/utils";

const Spinner = ({ className }) => (
  <div className="flex items-center justify-center h-full">
    <div
      className={cn(
        "size-5 border-[2px] border-t-1 border-black rounded-full animate-spin !border-t-transparent",
        className
      )}
    ></div>
  </div>
);

export default Spinner;
