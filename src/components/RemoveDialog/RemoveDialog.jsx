import { Button } from "../../components/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/components/ui/dialog";
import Spinner from "../Spinner/Spinner";

const RemoveDialog = (props) => {
  const { handleRemove, status, toggle, isMutating, title, button } = props;

  return (
    <Dialog open={status} onOpenChange={toggle}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="px-10 py-[50px] max-w-full rounded-none mobile:max-w-[545px]">
        <DialogHeader>
          <DialogTitle className="text-[26px] font-medium font-lora text-black leading-8 text-center max-w-[80%] mx-auto ">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-[50px] flex gap-[10px]">
          <Button
            onClick={handleRemove}
            disabled={isMutating}
            variant={"primary"}
            className="w-full h-[50px]"
          >
            {isMutating ? <Spinner /> : t("YesRemove")}
          </Button>
          <DialogClose asChild>
            <Button
              disabled={isMutating}
              variant={"outline"}
              className="w-full h-[50px]"
            >
              {("Cancel")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveDialog;
