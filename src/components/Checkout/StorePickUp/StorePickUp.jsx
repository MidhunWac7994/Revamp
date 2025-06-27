import { isObjectEmpty } from "../../../utils/objectUtil";
import Stores from "./Stores/Stores";
import useStorePickup from "./Stores/useStorePickUp";
import StoreCard from "../../StoreCard/StoreCard";
import BillingAddress from "../AddressCheckout/Billing/Billing";
import useSetBillingAddress from "../../../CustomHook/useSetBillingAdress";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import useSetShippingAddress from "../../../CustomHook/useSetShippingAdress";
import { Button } from "../../../components/components/ui/button";
import useSetShippingMethod from "../../../CustomHook/useSetShippingMethod";
import Spinner from "../../Spinner/Spinner";

const StorePickup = ({ handleDeliveryType }) => {
  const {
    mutateBillingAddressOnCart,
    billingAddressIdOnCart,
    shippingAddressIdOnCart,
    customerAddressLoading,
    handleDisabledAccordion,
    changeCurrentAccordion,
    selectedMethod,
    mutateShippingAddressOnCart,
  } = useCheckoutContext();

  const {
    storePickupData,
    storePickupLoading,
    mutateStorePickup,
    selectedStore,
    initialValues,
    existingUserValues,
  } = useStorePickup();

  const { setShippingMethodOnCart, settingShippingOnCart } =
    useSetShippingMethod();

  const { updateShippingAddress, shippingLoading } = useSetShippingAddress({
    mutateShippingAddressOnCart,
  });

  const { updateBillingAddress, billingLoading } = useSetBillingAddress({
    mutateBillingAddressOnCart,
  });

  const updateAddressOnCart = async (id) => {
    await updateShippingAddress(id);
    await updateBillingAddress(id);
  };

  const nextAccordion = () => {
    if (selectedMethod?.method_code === "pickup") {
      handleDisabledAccordion(["payment"], false);
      changeCurrentAccordion("payment", "storepickup");
    } else {
      setShippingMethodOnCart("pickup", "instore", () => {
        handleDisabledAccordion(["payment"], false);
        changeCurrentAccordion("payment", "storepickup");
      });
    }
  };

  const disabledButton =
    billingLoading ||
    shippingLoading ||
    !billingAddressIdOnCart ||
    !shippingAddressIdOnCart ||
    customerAddressLoading ||
    billingAddressIdOnCart !== shippingAddressIdOnCart;

  return (
    <div data-widget="StorePickup">
      {!storePickupLoading && isObjectEmpty(storePickupData) ? (
        <Stores
          initialCase
          handleDeliveryType={handleDeliveryType}
          mutateStorePickup={mutateStorePickup}
          initialValues={existingUserValues}
        />
      ) : storePickupLoading ? (
        <div className="mt-7">
          <h3 className="text-18 mb-5 text-black font-semibold">
            Store address
          </h3>
          <div className="bg-gray-bg animate-pulse w-full tablet:w-1/2 h-[170px] tablet:h-[118px]"></div>
        </div>
      ) : (
        <div className="mt-7">
          <h3 className="text-18 mb-5 text-black font-semibold">
            Store address
          </h3>
          <StoreCard
            content={selectedStore}
            isCheckoutCard
            jsxComponent={
              <Stores
                handleDeliveryType={handleDeliveryType}
                mutateStorePickup={mutateStorePickup}
                active={selectedStore?.pickup_location_code}
                initialValues={initialValues}
              />
            }
          />
        </div>
      )}

      <div className="mt-7 relative">
        <h3 className="text-18 text-black font-semibold">
          Billing Information
        </h3>
        <p className="mt-3 text-14 text-[#4B4B4B]">
          Select the address that matches your card or payment method
        </p>
        <BillingAddress
          updateAddressOnCart={updateAddressOnCart}
          selectedStore={selectedStore?.pickup_location_code}
          isStorePickup
        />
      </div>

      <div className="mt-5 max-mobile:fixed max-mobile:left-0 max-mobile:bottom-0 max-mobile:w-full max-mobile:h-auto max-mobile:p-4 max-mobile:bg-white max-mobile:z-10 max-mobile:border-t max-mobile:border-[#E7E7E7]">
        <Button
          disabled={disabledButton}
          variant={"primary"}
          size={"xl"}
          className={"max-mobile:w-full max-mobile:max-w-full"}
          onClick={nextAccordion}
        >
          {settingShippingOnCart ? (
            <Spinner className={"border-white"} />
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StorePickup;
