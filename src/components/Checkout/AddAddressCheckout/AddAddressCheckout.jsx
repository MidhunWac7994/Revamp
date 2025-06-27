import { Store } from "lucide-react";
import AddressDialog from "../../AddressDialog/AddressDialog";
import { Button } from "../../components/ui/button";
import useNewCheckoutAddress from "./useNewCheckoutAdress";
import useFormInitialValue from "../../../CustomHook/useFormInitialValues";
import { useToggle } from "../../../CustomHook/useToggle";

const AddAddressCheckout = (props) => {
  const {
    triggerBtnIcon,
    triggerBtnVariant,
    triggerBtnClass,
    triggerBtnLabel,
    initialCase,
    handleCheck,
    mutateCustomerAddress,
    updateAddressOnCart,
    handleDeliveryType,
    formTitle = "Fill with your personal details",
  } = props;

  const { status, toggle } = useToggle();
  const { status: initialStatus, setTrue } = useToggle();
  const { existingUserFormValues } = useFormInitialValue();

  const { handleSubmit, isLoading, formApiRef } = useNewCheckoutAddress({
    toggle: initialCase ? setTrue : toggle,
    mutateCustomerAddress,
    updateAddressOnCart,
  });

  const handleCloseForInitialCase = () => {
    if (handleCheck) {
      setTrue();
      handleCheck("same");
    }
  };

  return (
    <AddressDialog
      handleSubmit={handleSubmit}
      isMutating={isLoading}
      formApiRef={formApiRef}
      initialValues={existingUserFormValues}
      triggerBtnLabel={triggerBtnLabel}
      triggerBtnVariant={triggerBtnVariant}
      triggerBtnClass={triggerBtnClass}
      triggerBtnIcon={triggerBtnIcon}
      status={initialCase ? !initialStatus : status}
      toggle={initialCase ? handleCloseForInitialCase : toggle}
      formTitle={formTitle}
      isCheckout
      initialCase={initialCase}
      headerButton={
        <Button
          size="xl"
          variant="outlinePrimary"
          onClick={() => handleDeliveryType?.("storepickup")}
        >
          <Store size={24} />
          <span className="ml-2">Choose Store Pickup</span>
        </Button>
      }
    />
  );
};

export default AddAddressCheckout;
