import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import AvailableStoresModalContent from "./AvailableStoresModalContent";
import useLazyMount from "../../../CustomHook/uselazyMount";
import { useToggle } from "../../../CustomHook/useToggle";

const AvailableStoresModal = ({ sku, combinationNotFound }) => {
  const { status, setTrue, setFalse } = useToggle();
  const hasMounted = useLazyMount(status);

  return (
    <Dialog
      open={status}
      onOpenChange={(open) => (open ? setTrue() : setFalse())}
    >
      {/* ✅ Wrap a proper HTML element */}
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-lw-primary text-14 font-semibold transition ease-in-out duration-300 hover:text-black underline block max-mobile:mt-[5px]"
        >
          View Stores
        </button>
      </DialogTrigger>

      {hasMounted && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Available Stores</DialogTitle>
            <DialogDescription>
              Here are the stores where this item is available.
            </DialogDescription>
          </DialogHeader>

          <AvailableStoresModalContent
            sku={sku}
            combinationNotFound={combinationNotFound}
          />

          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AvailableStoresModal;
