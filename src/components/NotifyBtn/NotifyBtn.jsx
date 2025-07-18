import { Button } from "../components/ui/button";
import NotifyForm from "../NotifyBtn/NotifyForm/NotifyForm";
import DuelPopup from "../DuelPop/DuelPop";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useToggle } from "../../CustomHook/useToggle";

const NotifyBtn = (props) => {
  const {
    id,
    name,
    minPrice,
    maxPrice,
    combinationNotFound,
    attributeDetails,
    image,
    btnClassName,
  } = props;

  const { toggle, status } = useToggle();

  return (
    <DuelPopup
      status={status}
      toggle={() =>
        combinationNotFound ? toast.error("Please select a variant") : toggle()
      }
      title="Get Notified"
      description="We will send you a notification as soon as this product is available again"
      triggerButton={
        <Button
          className={cn("mt-2 h-10 px-6 bg-[#53bcb7] text-white rounded-none hover:bg-[#45a9a4] transition-colors , btnClassName")}
          variant="primary"
        >
          Notify Me
        </Button>
      }
    >
      <NotifyForm
        toggle={toggle}
        id={id}
        image={image}
        name={name}
        minPrice={minPrice}
        maxPrice={maxPrice}
        attributeDetails={attributeDetails}
      />
    </DuelPopup>
  );
};

export default NotifyBtn;
