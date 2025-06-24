import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerPortal,
  DrawerTrigger,
} from  '../../components/components/ui/drawer';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from  '../../components/components/ui/dialog';


const DuelPopup = ({
  status,
  toggle,
  children,
  hideButton,
  title,
  triggerButton,
  description,
}) => {


  return  (
    <Dialog open={status} onOpenChange={toggle}>
      {!hideButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
      <DialogContent className="sm:max-w-[547px] p-10 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-18 text-center mobile:!text-[26px] font-lora font-medium text-black">
            {title}
          </DialogTitle>
        </DialogHeader>
        {description && (
          <p className="mt-3 max-w-3/4 mx-auto text-center leading-6 text-16 text-[#4E4E51] ">
            {description}
          </p>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DuelPopup;
