import useUpdateAddress from "../../UpdateAddress/useUpdateAddress";

const useChangeAddress = (props) => {
  const { toggle, id, mutateCustomerAddress, updateAddressOnCart } = props;
  const { handleUpdateAddress, isMutating, formApiRef } = useUpdateAddress(
    toggle,
    id,
    mutateCustomerAddress
  );

  const handleSubmit = async (values) => {
    await handleUpdateAddress(values, (id) => {
      updateAddressOnCart?.(id);
    });
  };

  return { formApiRef, handleSubmit, isMutating };
};

export default useChangeAddress;
