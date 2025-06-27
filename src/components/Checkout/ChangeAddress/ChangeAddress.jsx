import useChangeAddress from "./useChangeAddress";
import { getAddressFormValues } from "../../../utils/formatAddressDetail";
import AddressDialog from "../../AddressDialog/AddressDialog";
import { useToggle } from "../../../CustomHook/useToggle";

const ChangeAddress = (props) => {
  const {
    address,
    mutateCustomerAddress,
    triggerBtnLabel,
    triggerBtnClass,
    updateAddressOnCart,
  } = props;
  const { status, toggle } = useToggle();
  const { handleSubmit, isMutating, formApiRef } = useChangeAddress({
    toggle,
    id: address?.id,
    mutateCustomerAddress,
    updateAddressOnCart,
  });

  const initialValues = getAddressFormValues(address);

  return (
    <AddressDialog
      triggerBtnLabel={triggerBtnLabel}
      triggerBtnClass={triggerBtnClass}
      handleSubmit={handleSubmit}
      isMutating={isMutating}
      formApiRef={formApiRef}
      status={status}
      toggle={toggle}
      initialValues={initialValues}
      submitBtnLabel="Update Address"
      drawerTitle="Edit Address"
      formTitle={"Edit your personal details"}
    />
  );
};

export default ChangeAddress;
