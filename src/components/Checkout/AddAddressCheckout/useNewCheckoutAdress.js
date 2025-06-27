import useAddAddress from "../../AddNewAddress/useAddAddress";

const useNewCheckoutAddress = (props) => {
  const { toggle, mutateCustomerAddress, updateAddressOnCart } = props;

  const { handleNewAddress, isMutating, formApiRef } = useAddAddress({
    toggle,
    mutateCustomerAddress,
  });

  const handleSubmit = async (values) => {
    await handleNewAddress(values, (id) => {
      updateAddressOnCart?.(id);
    });
  };

  return { formApiRef, handleSubmit, isMutating };
};

export default useNewCheckoutAddress;
