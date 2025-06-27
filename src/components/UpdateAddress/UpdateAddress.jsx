import { useToggle } from "../../CustomHook/useToggle"
import useUpdateAddress from "./useUpdateAddress";
import { getAddressFormValues } from "../../utils/formatAddressDetail";
import AddressDialog from "../AddressDialog/AddressDialog";

const UpdateAddress = (props) => {
  const {
    address,
    mutateCustomerAddress,
    triggerBtnLabel,
    triggerBtnClass,
    setDefaultAddress,
  } = props;
  const { status, toggle } = useToggle();
  const { handleUpdateAddress, isMutating, formApiRef } = useUpdateAddress(
    toggle,
    address?.id,
    mutateCustomerAddress,
    setDefaultAddress
  );
  const initialValues = getAddressFormValues(address);

  return (
    <AddressDialog
      triggerBtnLabel={triggerBtnLabel}
      triggerBtnClass={triggerBtnClass}
      handleSubmit={handleUpdateAddress}
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

export default UpdateAddress;
