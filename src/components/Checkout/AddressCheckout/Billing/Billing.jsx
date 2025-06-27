import AddressItem from "../../../AddressItem/AddressItem";
import AddAddressCheckout from "../../AddAddressCheckout/AddAddressCheckout";
import { useCheckoutContext } from "../../CheckoutProvider/CheckoutProvider";

const BillingAddress = (props) => {
  const { handleCheck, updateAddressOnCart, isStorePickup, selectedStore } =
    props;
  const {
    shippingAddressIdOnCart,
    billingAddressIdOnCart,
    addressData = [],
    mutateCustomerAddress,
    customerAddressLoading,
  } = useCheckoutContext();

  const initialCase = isStorePickup
    ? selectedStore && !customerAddressLoading
    : !customerAddressLoading;

  const billingAddressList = isStorePickup
    ? addressData
    : addressData?.filter((address) => address?.id !== shippingAddressIdOnCart);

  return billingAddressList?.length > 0 ? (
    <>
      <div
        className="flex justify-end items-center mb-5"
        data-widget="BillingAddress"
      >
        <AddAddressCheckout
          triggerBtnVariant="plane"
          triggerBtnClass="text-16 font-semibold text-lw-dark-blue absolute end-0 top-0 !py-0 z-10"
          triggerBtnLabel="Add new address"
          mutateCustomerAddress={mutateCustomerAddress}
          updateAddressOnCart={updateAddressOnCart}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {billingAddressList.map((address) => {
          const activeAddress = isActiveAddress({
            isStorePickup,
            shippingAddressIdOnCart,
            billingAddressIdOnCart,
            addressId: address?.id,
          });

          return (
            <AddressItem
              key={address?.id}
              address={address}
              activeAddress={activeAddress}
              updateAddressOnCart={updateAddressOnCart}
              mutateCustomerAddress={mutateCustomerAddress}
            />
          );
        })}
      </div>

      <AddAddressCheckout
        triggerBtnVariant="outlinePrimary"
        triggerBtnClass="h-12 text-lw-primary mt-[14px] mb-[30px] w-full font-semibold"
        triggerBtnLabel="Add new address"
        mutateCustomerAddress={mutateCustomerAddress}
        updateAddressOnCart={updateAddressOnCart}
      />
    </>
  ) : (
    initialCase && (
      <AddAddressCheckout
        initialCase
        handleCheck={handleCheck}
        mutateCustomerAddress={mutateCustomerAddress}
        updateAddressOnCart={updateAddressOnCart}
        formTitle="Fill with your personal details for billing"
      />
    )
  );
};

export default BillingAddress;

export function isActiveAddress({
  isStorePickup,
  shippingAddressIdOnCart,
  billingAddressIdOnCart,
  addressId,
}) {
  if (!addressId) return false;

  if (isStorePickup) {
    return (
      shippingAddressIdOnCart &&
      billingAddressIdOnCart &&
      shippingAddressIdOnCart === billingAddressIdOnCart &&
      shippingAddressIdOnCart === addressId
    );
  }

  return billingAddressIdOnCart === addressId;
}
