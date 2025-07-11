import { Button } from '../../components/ui/button';
import { useCheckoutContext } from '../CheckoutProvider/CheckoutProvider'
import MyAddressShimmer from '../../MyAddress/MyAddressShimmer'
import AddAddressCheckout from '../AddAddressCheckout/AddAddressCheckout'
import EmptyPages from "../../EmptyPages/EmptyPages";
import CustomRadio from "../../CustomRadio/CustomRadio";
import BillingAddress from "../AddressCheckout/Billing/Billing";
import useSetBillingAddress from "../../../CustomHook/useSetBillingAdress";
import ShippingAddress from "../../Checkout/AddressCheckout/ShippingAddress/ShippingAddress";
import useSetShippingAddress from "../../../CustomHook/useSetShippingAdress";
import useAddressCheckout from './useAddressCheckout';

const AddressCheckout = ({ handleDeliveryType }) => {
  const {
    addressData,
    hasCustomerAddress,
    error,
    shippingAddressIdOnCart,
    mutateCustomerAddress,
    billingAddressIdOnCart,
    mutateBillingAddressOnCart,
    mutateShippingMethod,
    handleDisabledAccordion,
    changeCurrentAccordion,
    mutateShippingAddressOnCart,
    customerAddressLoading,
  } = useCheckoutContext();

  const { updateBillingAddress, billingLoading } = useSetBillingAddress({
    mutateBillingAddressOnCart,
    mutateShippingMethod,
  });

  const { updateShippingAddress, shippingLoading } = useSetShippingAddress({
    mutateShippingMethod,
    mutateShippingAddressOnCart,
  });

  const { checked, handleCheck } = useAddressCheckout({
    shippingAddressIdOnCart,
    billingAddressIdOnCart,
    updateBillingAddress,
  });

  const nextAccordion = () => {
    handleDisabledAccordion(["shipping", "payment"], false);
    changeCurrentAccordion("shipping");
  };

  const disabledButton =
    !checked ||
    billingLoading ||
    shippingLoading ||
    !billingAddressIdOnCart ||
    !shippingAddressIdOnCart ||
    (checked === "different" &&
      shippingAddressIdOnCart === billingAddressIdOnCart) ||
    customerAddressLoading;

  const disabledRadio =
    billingLoading || shippingLoading || customerAddressLoading;

  return (
    <div
      data-widget="AddressCheckout"
      className="max-mobile:py-6 max-mobile:mt-6 max-mobile:border-t max-mobile:border-[#EBEBEB] "
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-18 text-black font-semibold ">
          {("Delivery address")}
        </h3>
        <AddAddressCheckout
          triggerBtnVariant="plane"
          triggerBtnClass="text-16 p-0 h-fit font-semibold text-lw-dark-blue max-mobile:hidden"
          triggerBtnLabel="Add new address"
          mutateCustomerAddress={mutateCustomerAddress}
          updateAddressOnCart={updateShippingAddress}
          handleDeliveryType={handleDeliveryType}
        />
      </div>
      {hasCustomerAddress ? (
        <ShippingAddress
          updateShippingAddress={updateShippingAddress}
          addressData={addressData}
          shippingAddressIdOnCart={shippingAddressIdOnCart}
          mutateCustomerAddress={mutateCustomerAddress}
        />
      ) : error ? (
        <EmptyPages
          title={("No Saved Addresses")}
          subTitle={(
            "Please add an address to your profile to complete orders"
          )}
          icon={emptyAddress}
        />
      ) : !customerAddressLoading && !addressData?.length ? (
        <AddAddressCheckout
          initialCase
          handleDeliveryType={handleDeliveryType}
          formTitle={"Fill with your personal details for shipping"}
        />
      ) : (
        <MyAddressShimmer />
      )}
      {/* <AddAddressCheckout
        triggerBtnVariant="outlinePrimary"
        triggerBtnClass="h-12 text-lw-primary mt-[14px] w-full font-semibold mobile:hidden"
        // triggerBtnLabel="Addnewaddress"
        mutateCustomerAddress={mutateCustomerAddress}
        updateAddressOnCart={updateShippingAddress}
        handleDeliveryType={handleDeliveryType}
      /> */}

      <div className="mt-7">
        <h3 className="text-18 text-black font-semibold ">
          {("Billing Information")}
        </h3>
        <p className="mt-3 text-14 text-[#4B4B4B]">
          {("Select the address that matches your card or payment method")}
        </p>

        <div className="flex items-center space-x-10 mt-5">
          <CustomRadio
            options={billingOptions}
            activeValue={checked}
            onChange={handleCheck}
            itemClass="flex-row-reverse gap-2 cursor-pointer"
            className={"flex max-mobile:flex-col gap-y-2 gap-x-12"}
            disabled={disabledRadio}
          />
        </div>
        {checked === "different" && (
          <BillingAddress
            handleCheck={handleCheck}
            updateAddressOnCart={updateBillingAddress}
          />
        )}
      </div>
      <div className="mt-5 max-mobile:fixed max-mobile:start-0 max-mobile:bottom-0 max-mobile:w-full max-mobile:h-auto max-mobile:p-4 max-mobile:bg-white max-mobile:z-10 max-mobile:border-t max-mobile:border-[#E7E7E7]">
        <Button
          disabled={disabledButton}
          variant={"primary"}
          className={"max-mobile:w-full max-mobile:max-w-full"}
          size={"xl"}
          onClick={nextAccordion}
        >
          {("Delivery here")}
        </Button>
      </div>
    </div>
  );
};

export default AddressCheckout;

const billingOptions = [
  {
    label: "Use same as the shipping address",
    value: "same",
  },
  {
    label: "Use a different billing address",
    value: "different",
  },
];
