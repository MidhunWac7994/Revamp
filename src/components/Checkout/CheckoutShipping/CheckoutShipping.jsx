import { Button } from "../../components/ui/button";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import DeliveryMethod from "../DeliveryMethod/DeliveryMethod";
import ScheduleDate from "../ScheduleDate/ScheduleDate";
import useCheckoutShipping from "./useCheckoutShipping";
import WarningMsg from "./WarningMsg/WarningMsg";

const CheckoutShipping = () => {
  const {
    handleDisabledAccordion,
    changeCurrentAccordion,
    selectedMethod,
    selectedShippingLoading,
  } = useCheckoutContext();

  const {
    gettingShippingMethods,
    confirmShippingMethod,
    shippingMethods,
    settingShippingOnCart,
    setShippingMethodOnCart,
    warningMsg,
  } = useCheckoutShipping({
    handleDisabledAccordion,
    changeCurrentAccordion,
  });

  const disableBtn =
    !selectedMethod?.method_code ||
    gettingShippingMethods ||
    settingShippingOnCart ||
    selectedShippingLoading;

  return (
    <div data-widget="CheckoutShipping" className="px-6 pt-6 pb-6 bg-white">
      <DeliveryMethod
        shippingMethods={shippingMethods}
        selectedMethodCode={selectedMethod?.method_code}
        gettingShippingMethods={gettingShippingMethods}
        settingShippingOnCart={settingShippingOnCart || selectedShippingLoading}
        setShippingMethodOnCart={setShippingMethodOnCart}
      />

      {warningMsg?.length > 0 && <WarningMsg warningMsg={warningMsg} />}

      {selectedMethod?.method_code === "scheduledshipping" ? (
        <ScheduleDate disableBtn={disableBtn} />
      ) : (
        <div className="mt-5">
          <Button
            disabled={disableBtn}
            className="w-40 bg-[#53bcb7] text-white  rounded-none  h-12"
            variant="primary"
            size="xl"
            onClick={confirmShippingMethod}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
