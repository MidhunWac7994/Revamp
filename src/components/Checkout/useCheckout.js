import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalData } from "../../CustomHook/useGlobalData";
import { getLocalStorageWithExpiry } from "../../utils/storageUtil";
import { GUEST_USER_KEY } from "../Constants";

const useCheckout = (props) => {
  const { selectedMethod, hasShippingAddressOnCart } = props;
  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { isSignedIn } = useGlobalData();

  const [searchParams, setSearchParams] = useSearchParams();

  const purchaseMethod = searchParams.get("type") || "home_delivery";
  const activeAccordion = searchParams.get("step") || "customer_info"; 

  const [disabled, setDisabled] = useState({
    customer_info: false, 
    customer_address: !(isSignedIn || guestData?.mobile), 
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

  const changeCurrentAccordion = (id, type, force = false) => {
    if (id && (force || !disabled[id])) {
      console.log(`Changing accordion to: ${id}`);
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
    } else {
      console.warn(`Cannot open ${id} because it is disabled`);
    }
  };
  
  

  const activeShippingMethod =
    purchaseMethod === "home_delivery"
      ? selectedMethod !== "pickup"
      : selectedMethod === "pickup";

  const getUserVisitedSteps = () => {
    let steps = [];

    if (isSignedIn || guestData?.mobile) {
      steps.push("customer_info");
      if (hasShippingAddressOnCart) {
        steps.push("customer_address");
        if (selectedMethod && activeShippingMethod) {
          steps.push("shipping");
          steps.push("payment");
        }
      }
    }

    return steps;
  };

  const userVisited = getUserVisitedSteps();

  useEffect(() => {
    console.log("useCheckout useEffect:", {
      isSignedIn,
      guestData,
      userVisited,
    });
    setDisabled((prev) => ({
      ...prev,
      customer_info: false, 
      customer_address: !(isSignedIn || guestData?.mobile), // Enable if signed in or guest data
      shipping: !userVisited.includes("shipping"),
      payment: !userVisited.includes("payment"),
    }));
  }, [
    isSignedIn,
    guestData?.mobile,
    hasShippingAddressOnCart,
    selectedMethod,
    activeShippingMethod,
  ]);

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

      if (
        step.eventKey === "customer_info" &&
        (isSignedIn || guestData?.mobile)
      ) {
        completed[step.eventKey] = true;
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

      if (step.eventKey === "payment" && userVisited.includes("payment")) {
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
