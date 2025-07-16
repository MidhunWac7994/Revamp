
import AddressItem from "../../../AddressItem/AddressItem";

const ShippingAddress = (props) => {
  const {
    updateShippingAddress,
    addressData,
    shippingAddressIdOnCart,
    isGuest,
    mutateGuestAddress,
    mutateCustomerAddress,
  } = props;

  return (
    <div
      data-widget="ShippingAddress"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {addressData?.map((address, index) => (
        <AddressItem
          key={address?.id || index}
          address={address}
          activeAddress={shippingAddressIdOnCart === address?.id}
          updateAddressOnCart={updateShippingAddress}
          isGuest={isGuest}
          mutateGuestAddress={mutateGuestAddress}
          mutateCustomerAddress={mutateCustomerAddress}
        />
      ))}
    </div>
  );
};

export default ShippingAddress;
