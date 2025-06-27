import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalData } from "../../CustomHook/useGlobalData";
import { getLocalStorageWithExpiry } from "../../utils/storageUtil";
import { GUEST_USER_KEY } from  '../Constants'

const useCheckout = (props) => {
  const { selectedMethod, hasShippingAddressOnCart } = props;
  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { isSignedIn } = useGlobalData();

  const [searchParams, setSearchParams] = useSearchParams();

  const purchaseMethod = searchParams.get("type") || "home_delivery";
  const activeAccordion = searchParams.get("step") || "";

  const [disabled, setDisabled] = useState({
    customer_info: isSignedIn ? true : false,
    customer_address: isSignedIn ? false : true,
    shipping: true,
    payment: true,
  });

  const updatePurchaseMode = (value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set("type", value);
      } else {
        newParams.delete("type");
      }
      return newParams;
    });
  };

  const changeCurrentAccordion = (id, type) => {
    if (id) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("step", id);
        return newParams;
      });

      if (
        id !== "shipping" &&
        type === "storepickup" &&
        selectedMethod === "pickup"
      ) {
        updatePurchaseMode("storepickup");
      } else if (!type) {
        updatePurchaseMode(null);
      }
    }
  };

  const activeShippingMethod =
    purchaseMethod === "home_delivery"
      ? selectedMethod !== "pickup"
      : selectedMethod === "pickup";

  const getUserVisitedSteps = () => {
    let steps = [];

    if (isSignedIn) {
      if (hasShippingAddressOnCart) steps = ["customer_address", "shipping"];
      if (hasShippingAddressOnCart && selectedMethod && activeShippingMethod) {
        steps = [...steps, "payment"];
      }
    } else {
      if (guestData?.mobile) steps = ["customer_info", "customer_address"];
      if (guestData?.mobile && hasShippingAddressOnCart)
        steps = [...steps, "shipping"];
      if (
        guestData?.mobile &&
        hasShippingAddressOnCart &&
        selectedMethod &&
        activeShippingMethod
      ) {
        steps = [...steps, "payment"];
      }
    }

    return steps;
  };

  const userVisited = getUserVisitedSteps();

  useEffect(() => {
    if (userVisited?.length && isSignedIn) {
      setDisabled((prev) => ({
        ...prev,
        shipping: !userVisited.includes("shipping"),
        payment: !userVisited.includes("payment"),
      }));
    } else if (userVisited?.length && !isSignedIn) {
      setDisabled((prev) => ({
        ...prev,
        customer_address: !userVisited.includes("customer_address"),
        shipping: !userVisited.includes("shipping"),
        payment: !userVisited.includes("payment"),
      }));
    }
  }, [selectedMethod, hasShippingAddressOnCart, isSignedIn]);

  const handleDisabledAccordion = (eventKeyArr, value) => {
    eventKeyArr?.forEach((eventKey) => {
      setDisabled((prev) => ({
        ...prev,
        [eventKey]: value,
      }));
    });
  };

  const getComletedSteps = (array = []) => {
    let completed = {};

    for (let i = 0; i < array.length; i++) {
      const step = array[i];

      if (step.eventKey === "customer_info") {
        if (isSignedIn || guestData?.mobile) {
          completed[step.eventKey] = true;
        }
      }

      if (step.eventKey === "customer_address" && hasShippingAddressOnCart) {
        completed[step.eventKey] = true;
      }

      if (
        step.eventKey === "shipping" &&
        selectedMethod &&
        selectedMethod !== "pickup"
      ) {
        completed[step.eventKey] = true;
      }
    }

    return completed;
  };

  return {
    changeCurrentAccordion,
    disabled,
    handleDisabledAccordion,
    activeAccordion,
    purchaseMethod,
    updatePurchaseMode,
    getComletedSteps,
  };
};

export default useCheckout;
