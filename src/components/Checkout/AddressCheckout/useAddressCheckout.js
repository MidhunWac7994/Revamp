import { useEffect, useState } from "react";
import { toast } from "sonner";

const useAddressCheckout = (props) => {
  const {
    shippingAddressIdOnCart,
    billingAddressIdOnCart,
    updateBillingAddress,
  } = props;

  const isSameAddress =
    (shippingAddressIdOnCart || billingAddressIdOnCart) &&
    shippingAddressIdOnCart === billingAddressIdOnCart;

  const isDifferentAddress =
    shippingAddressIdOnCart &&
    billingAddressIdOnCart &&
    shippingAddressIdOnCart !== billingAddressIdOnCart;

  const initialValue = isSameAddress
    ? "same"
    : isDifferentAddress
    ? "different"
    : null;

  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    let stateUpdated = true;
    if (stateUpdated)
      if (
        shippingAddressIdOnCart === billingAddressIdOnCart &&
        checked !== "same"
      ) {
        setChecked("same");
      } else if (
        shippingAddressIdOnCart !== billingAddressIdOnCart &&
        checked !== "different"
      ) {
        setChecked("different");
      }

    return () => {
      stateUpdated = false;
    };
  }, [shippingAddressIdOnCart, billingAddressIdOnCart]);

  const handleCheck = (value, dontUpdate) => {
    if (
      value === "same" &&
      billingAddressIdOnCart !== shippingAddressIdOnCart &&
      !dontUpdate
    ) {
      if (shippingAddressIdOnCart)
        updateBillingAddress(shippingAddressIdOnCart);
      else toast.error("Please select a shipping address");
    }
    setChecked(value);
  };

  return { checked, handleCheck };
};

export default useAddressCheckout;
