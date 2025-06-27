import { useCheckoutContext } from  "../CheckoutProvider/CheckoutProvider";
import useCartConfig from "../../../CustomHook/useCartConfig";
import useSetShippingMethod from "../../../CustomHook/useSetShippingMethod";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_SHIPPING_METHODS = gql`
  query GetShippingMethods($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      shipping_addresses {
        available_shipping_methods {
          carrier_code
          method_title
          method_code
          is_default
          amount {
            value
          }
        }
      }
    }
  }
`;

const useCheckoutShipping = (props) => {
  const { handleDisabledAccordion, changeCurrentAccordion } = props;
  const navigate = useNavigate();
  const { cartId } = useCartConfig();
  const { cartItems, selectedMethod } = useCheckoutContext();
  const { setShippingMethodOnCart, settingShippingOnCart } =
    useSetShippingMethod();

  const { data, loading: gettingShippingMethods } = useQuery(
    GET_SHIPPING_METHODS,
    {
      variables: { cart_id: cartId },
      onCompleted: (data) => {
        const shippingMethods =
          data?.cart?.shipping_addresses?.[0]?.available_shipping_methods;

        const filteredMethods = filterShippingMethods(
          cartItems,
          shippingMethods
        );
        const defaultShippingMethod = filteredMethods?.find(
          (m) => m?.is_default
        );

        if (defaultShippingMethod) {
          setShippingMethodOnCart(
            defaultShippingMethod.method_code,
            defaultShippingMethod.carrier_code
          );
        }
      },
      onError: (err) => {
        console.error(err);
        navigate("/cart");
      },
    }
  );

  const msg = {
    expressshipping: "Deliver Today within 2 hours",
    normalshipping: "Deliver Today within 24 hours",
    scheduledshipping: "Choose your date & time for Delivery",
  };

  const shippingMethods =
    data?.cart?.shipping_addresses?.[0]?.available_shipping_methods
      ?.filter((ele) => ele?.method_code !== "pickup")
      ?.map((ele) => ({
        carrier_code: ele?.carrier_code,
        method_title: ele?.method_title,
        method_code: ele?.method_code,
        is_default: ele?.is_default,
        amount: ele?.amount?.value,
        description: msg?.[ele?.method_code],
      }));

  const filteredMethods = filterShippingMethods(cartItems, shippingMethods);

  const confirmShippingMethod = () => {
    handleDisabledAccordion(["shipping", "payment"], false);
    changeCurrentAccordion("payment");
  };

  let warningMsg = [
    { id: "commonWarning", msg: "" },
    { id: "itemRelated", msg: "" },
  ];

  const updateWarningMessage = (message) => {
    warningMsg.forEach((item) => {
      if (item.id === "itemRelated") {
        item.msg = message;
      }
    });
  };

  const hasExpress = getDeliveryType(cartItems, "express");
  const hasNormal = getDeliveryType(cartItems, "normal");

  if (selectedMethod?.method_code === "normalshipping") {
    if (hasNormal && hasExpress) {
      updateWarningMessage("within24Hrs");
    } else if (hasExpress) {
      updateWarningMessage("Allwithin24Hrs");
    }
  } else if (selectedMethod?.method_code === "expressshipping") {
    if (hasExpress && hasNormal) {
      updateWarningMessage("within24Hrs");
    }
  } else if (selectedMethod?.method_code === "scheduledshipping") {
    updateWarningMessage("scheduleWarning");
  }

  return {
    gettingShippingMethods,
    confirmShippingMethod,
    shippingMethods: filteredMethods,
    warningMsg,
    settingShippingOnCart,
    setShippingMethodOnCart,
  };
};

export default useCheckoutShipping;

// --- Helpers ---

const filterShippingMethods = (cartItems, shippingMethods) => {
  const hasExpress = getDeliveryType(cartItems, "express");
  const hasNormal = getDeliveryType(cartItems, "normal");

  const deliveryTypes = ["scheduledshipping"];
  if (hasExpress) {
    deliveryTypes.push("expressshipping", "normalshipping");
  } else if (hasNormal) {
    deliveryTypes.push("normalshipping");
  }

  return shippingMethods?.filter((method) =>
    deliveryTypes.includes(method?.method_code)
  );
};

const getDeliveryType = (cartItems = [], code) => {
  return cartItems?.some(
    (item) => item?.product?.product_delivery_type === code
  );
};
