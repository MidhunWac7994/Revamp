import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { cn } from "../lib/utils";

const DuelPopup = (props) => {
  const {
    status,
    toggle,
    children,
    hideButton,
    title,
    triggerButton,
    description,
    dialogWidth,
  } = props;

  return (
    <Dialog open={status} onOpenChange={toggle}>
      {!hideButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenChange={toggle}
        className={cn("sm:max-w-[547px] p-10 rounded-none", dialogWidth)}
      >
        <DialogHeader>
          <DialogTitle className="text-18 text-center mobile:!text-[26px] font-lora font-medium text-black">
            {title}
          </DialogTitle>
        </DialogHeader>
        {description && (
          <p className="mt-3 max-w-3/4 mx-auto text-center leading-6 text-16 text-[#4E4E51]">
            {description}
          </p>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DuelPopup;
