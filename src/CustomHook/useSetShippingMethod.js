import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import useCartConfig from "./useCartConfig";
import { useCheckoutContext } from "../components/Checkout/CheckoutProvider/CheckoutProvider";

const SET_SHIPPING_METHODS_ON_CART = gql`
  mutation SetShippingMethodsOnCart(
    $cartId: String!
    $methodCode: String!
    $carrierCode: String!
  ) {
    setShippingMethodsOnCart(
      input: {
        cart_id: $cartId
        shipping_methods: [
          { carrier_code: $carrierCode, method_code: $methodCode }
        ]
      }
    ) {
      cart {
        shipping_addresses {
          selected_shipping_method {
            carrier_code
            method_code
          }
        }
      }
    }
  }
`;

const useSetShippingMethod = () => {
  const navigate = useNavigate();
  const { cartId } = useCartConfig();
  const { mutateShippingMethod } = useCheckoutContext();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [setShippingMethod, { loading: settingShippingOnCart }] = useMutation(
    SET_SHIPPING_METHODS_ON_CART
  );

  const setShippingMethodOnCart = async (methodCode, carrierCode, callback) => {
    if (!methodCode || !carrierCode) {
      if (isMounted.current) {
        toast.error("Please select a shipping method", {
          id: "shipping-method-required",
        });
      }
      return;
    }

    try {
      await setShippingMethod({
        variables: {
          cartId,
          methodCode,
          carrierCode,
        },
      });

      if (isMounted.current) {
        mutateShippingMethod?.();
        if (typeof callback === "function") callback();
      }
    } catch (err) {
      if (!isMounted.current) return;

      const message = err?.message || "Something went wrong";
      console.error("[Shipping Error]", message);

      toast.error(message, {
        id: "set-shipping-error",
      });

      if (message === `The cart isn't active.`) {
        navigate("/cart");
      }
    }
  };

  return { setShippingMethodOnCart, settingShippingOnCart };
};

export default useSetShippingMethod;
