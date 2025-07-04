import { useParams } from "react-router-dom";
import usePayment from "./usePayment";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import PaymentMethods from "./PaymentMethods";
import { Button } from "../../../components/components/ui/button";
import Spinner from "../../Spinner/Spinner";

const Payment = () => {
  const { locale } = useParams(); 
  const {
    prices,
    shippingAddress,
    selectedMethod,
    customPrices,
    cartItems,
    totalQuantity,
  } = useCheckoutContext();

  const { isSignedIn } = useGlobalData();

  const {
    paymentOptions,
    isLoading,
    handleChangePaymentMode,
    handlePlaceOrder,
    placeOrderLoading,
    isRedirecting,
    selectedMethodCode,
  } = usePayment({
    shippingMethod: selectedMethod?.method_code,
    isSignedIn,
    customPrices,
    prices,
    cartItems,
    totalQuantity,
    locale, 
  });

  return (
    <div className="p-6 bg-white">
      <h3 className="text-xl font-semibold mb-5">Payment Methods</h3>

      {isLoading ? (
        <div className="animate-pulse">
          {[...Array(3).keys()].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-y-4 border-b border-gray-200 first-of-type:border-t"
            >
              <div className="flex items-center gap-x-3 py-4 w-full">
                <div className="size-6 rounded-full bg-gray-200"></div>
                <div className="w-40 h-5 bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        paymentOptions?.length > 0 &&
        paymentOptions.map((mode) => (
          <PaymentMethods
            key={mode?.code}
            mode={mode}
            handleChangePaymentMode={handleChangePaymentMode}
            handlePlaceOrder={handlePlaceOrder}
            placeOrderLoading={placeOrderLoading}
            prices={prices}
            guestShippingAddress={shippingAddress}
            isRedirecting={isRedirecting}
            isLoading={isLoading}
            active={selectedMethodCode}
          />
        ))
      )}

      <div className="mt-6">
        <Button
          disabled={placeOrderLoading || isRedirecting}
          variant="primary"
          size="lg"
          onClick={handlePlaceOrder}
        >
          {placeOrderLoading || isRedirecting ? <Spinner /> : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
