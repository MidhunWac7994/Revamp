import { Form, Multistep } from "informed";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Truck } from "lucide-react"; 
import useStores from "./useStores";
import PickupStoreAndForm from "../Stores/PickUpStoreAndForm/PickupStoreAndForm";
import { Button } from "../../../components/ui/button";
import { useToggle } from  "../../../../CustomHook/useToggle"

const Stores = (props) => {
  const {
    initialCase,
    handleDeliveryType,
    mutateStorePickup,
    active,
    initialValues,
  } = props;

  const { status, toggle } = useToggle();
  const { status: initialStatus, setTrue } = useToggle();

  const isOpen = initialCase ? !initialStatus : status;

  const {
    stores,
    isLoading,
    onGoogleApiLoaded,
    handleCurrentLocation,
    handleSelectStore,
    isMutating,
    formApiRef,
    handleSubmit,
  } = useStores({
    isOpen,
    toggle: initialCase ? setTrue : toggle,
    mutateStorePickup,
  });

  const handleOpenChange = () => {
    if (initialCase) setTrue();
    else toggle();

    if (isOpen) {
      handleDeliveryType?.("home_delivery");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!initialCase && (
        <DialogTrigger asChild>
          <Button
            variant="outlineDark"
            className="laptop:absolute laptop:end-5 laptop:bottom-5 max-laptop:mt-4 min-w-auto h-[35px] rounded-[5px] !text-13 font-light"
          >
            Change Store
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        closeHidden
        data-widget="Stores"
        className="px-0 py-5 tablet:px-6 tablet:py-6 tabletPro:px-[40px] tabletPro:py-[40px] max-w-full sm:max-w-[550px] tablet:max-w-[650px] tabletPro:max-w-[800px] laptop:max-w-[940px] desktop-lg:max-w-[1078px] max-h-full overflow-hidden overflow-y-auto search-wrap"
      >
        <DialogHeader className="flex items-center justify-between mb-[25px]">
          <DialogTitle className="text-20">
            Pick your store location
          </DialogTitle>
          <Button
            size="xl"
            variant="outlinePrimary"
            onClick={() => handleDeliveryType("home_delivery")}
            className="max-w-full"
          >
            <Truck size={22} className="mr-2" />
            Choose Home Delivery
          </Button>
        </DialogHeader>

        <Form
          formApiRef={formApiRef}
          onSubmit={handleSubmit}
          className="pb-0 overflow-y-auto search-wrap"
          initialValues={{
            pickup_form: initialValues,
          }}
        >
          <Multistep>
            <PickupStoreAndForm
              stores={stores}
              handleSelectStore={handleSelectStore}
              isMutating={isMutating}
              active={active}
              handleCurrentLocation={handleCurrentLocation}
              isLoading={isLoading}
              onGoogleApiLoaded={onGoogleApiLoaded}
              handleDeliveryType={handleDeliveryType}
              initialCase={initialCase}
            />
          </Multistep>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Stores;
