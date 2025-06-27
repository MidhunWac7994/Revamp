import { createContext, useContext } from "react";
import useCheckout from "../useCheckout";
import useCartShippingAddress from "../../../CustomHook/useCartShippingAdress";
import useCartShippingMethod from "../../../CustomHook/useCartShippingMethod";
import useCartCustomPrice from "../../../CustomHook/useCartCustomPrice";
import useCartItemsForCheckout from "../../../CustomHook/useCartItemsForCheckout";

const CheckoutContext = createContext();

const CheckoutProvider = ({ children, customerAddress }) => {
  const cartShippingAddress = useCartShippingAddress();
  const cartShippingMethod = useCartShippingMethod();
  const cartItems = useCartItemsForCheckout();
  const cartCustomPrices = useCartCustomPrice();

  const checkoutProps = useCheckout({
    selectedMethod: cartShippingMethod?.selectedMethod?.method_code,
    hasShippingAddressOnCart: cartShippingAddress?.hasShippingAddressOnCart,
  });

  // Log context values for debugging
  console.log("CheckoutProvider Context:", {
    cartShippingAddress,
    cartShippingMethod,
    cartItems,
    cartCustomPrices,
    checkoutProps,
    customerAddress,
  });

  return (
    <CheckoutContext.Provider
      value={{
        ...checkoutProps,
        ...cartItems,
        ...cartCustomPrices,
        ...customerAddress,
        ...cartShippingMethod,
        ...cartShippingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;

export const useCheckoutContext = () => useContext(CheckoutContext);
