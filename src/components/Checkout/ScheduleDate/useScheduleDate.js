import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import {
  convertDateStringToObject,
  convertToDateString,
} from "../../../utils/convertsToDateString";
import { isObjectEmpty } from "../../../utils/objectUtil";
import { toast } from "sonner";
import useCartConfig from "../../../CustomHook/useCartConfig";

export const DEFAULT_LEAD_TIME = 1;

const GET_DELIVERY_TIME = gql`
  query GetDeliveryTime {
    scheduledDeliveryTimings {
      from_time
      to_time
    }
  }
`;

const SET_DATE_AND_TIME = gql`
  mutation SetDateAndTime(
    $cartId: String!
    $scheduledDate: String!
    $scheduledFromTime: String!
    $scheduledToTime: String!
  ) {
    setDeliveryAdditionalData(
      input: {
        cart_id: $cartId
        scheduled_date: $scheduledDate
        scheduled_from_time: $scheduledFromTime
        scheduled_to_time: $scheduledToTime
      }
    )
  }
`;

const GET_SELECTED_DATE_TIME = gql`
  query GetSelectedDateTime($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      delivery_additional_data {
        scheduled_date
        scheduled_from_time
        scheduled_to_time
      }
    }
  }
`;

const useScheduleDate = () => {
  const { cartItems, handleDisabledAccordion, changeCurrentAccordion } =
    useCheckoutContext();
  const { cartId } = useCartConfig();

  const [dateAndTime, setDateAndTime] = useState({
    scheduledDate: {},
    scheduledTime: "",
  });

  const maxLeadTime =
    cartItems?.reduce((acc, item) => {
      return item?.product?.lead_time > acc ? item?.product?.lead_time : acc;
    }, cartItems?.[0]?.product?.lead_time) || DEFAULT_LEAD_TIME;

  const generateDays = () => {
    if (!maxLeadTime) return [];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = [];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Number(maxLeadTime));

    for (let j = 0; j < 7; j++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + j);

      result.push({
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
      });
    }

    return result;
  };

  // Apollo Query for delivery times
  const { data, loading: isLoading, error } = useQuery(GET_DELIVERY_TIME);

  // Apollo Query for selected date/time in cart
  const {
    data: selectedData,
    loading: selectedTimeLoading,
    error: selectedTimeError,
  } = useQuery(GET_SELECTED_DATE_TIME, {
    variables: { cartId },
    skip: !cartId,
    onCompleted: (data) => {
      const time = data?.cart?.delivery_additional_data;
      if (!isObjectEmpty(time)) {
        setDateAndTime({
          scheduledDate: convertDateStringToObject(time?.scheduled_date),
          scheduledTime: `${time?.scheduled_from_time} - ${time?.scheduled_to_time}`,
        });
      }
    },
  });

  // Apollo Mutation to set date/time
  const [setDateAndTimeMutation, { loading: isMutating }] = useMutation(
    SET_DATE_AND_TIME,
    {
      onCompleted: () => {
        handleDisabledAccordion(["shipping", "payment"], false);
        changeCurrentAccordion("payment");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to set schedule");
      },
    }
  );

  useEffect(() => {
    if (data?.scheduledDeliveryTimings?.length > 0) {
      setDateAndTime((prev) => ({
        ...prev,
        scheduledTime: `${data.scheduledDeliveryTimings[0].from_time} - ${data.scheduledDeliveryTimings[0].to_time}`,
      }));
    }
  }, [data]);

  const deliveryTime =
    data?.scheduledDeliveryTimings?.length > 0
      ? data.scheduledDeliveryTimings.map((time) => ({
          label: `${time.from_time} - ${time.to_time}`,
          value: `${time.from_time} - ${time.to_time}`,
        }))
      : [];

  const handleSetDeliveryTime = (time) => {
    setDateAndTime((prev) => ({ ...prev, scheduledTime: time }));
  };

  const handleSetDate = (date) => {
    setDateAndTime((prev) => ({ ...prev, scheduledDate: date }));
  };

  const confirmShippingMethod = async () => {
    if (
      !isObjectEmpty(dateAndTime?.scheduledDate) &&
      dateAndTime?.scheduledTime
    ) {
      try {
        await setDateAndTimeMutation({
          variables: {
            cartId,
            scheduledDate: convertToDateString(dateAndTime.scheduledDate),
            scheduledFromTime: dateAndTime.scheduledTime.split(" - ")[0],
            scheduledToTime: dateAndTime.scheduledTime.split(" - ")[1],
          },
        });
      } catch {
        // error handled by onError callback
      }
    } else {
      toast.error("Please select date and time", { id: "schedule-date-error" });
    }
  };

  return {
    generateDays,
    deliveryTime,
    isLoading,
    dateAndTime,
    handleSetDeliveryTime,
    handleSetDate,
    confirmShippingMethod,
    selectedTimeLoading,
    isMutating,
  };
};

export default useScheduleDate;
