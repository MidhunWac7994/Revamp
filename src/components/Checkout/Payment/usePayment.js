import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { CARTID_KEY } from "../../Constants";

export const GET_PAYMENT_METHODS = gql `
  query GetPaymentMethods($cartId: String!) {
    cart(cart_id: $cartId) {
      available_payment_methods {
        code
        title
        ImageUrl
        myfatoorah_embed_data {
          callback
          currencyCode
          CountryCode
          amount
          SessionId
          paymentOptions
        }
      }
    }
  }
`;

const SET_PAYMENT_METHOD = gql`
  mutation SetPaymentMethodOnCart($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $code } }
    ) {
      cart {
        selected_payment_method {
          code
        }
      }
    }
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      order {
        order_number
        payment_code
      }
    }
  }
`;

const usePayment = (props = {}) => {
  const { shippingMethod = "", isSignedIn = false } = props;

  const navigate = useNavigate();
  const { locale } = useParams(); 

  const [isRedirecting, setIsRedirecting] = useState(false);

  const rawCartId = localStorage.getItem(CARTID_KEY) || "";
  const cleanedCartId = rawCartId.replace(/^"+|"+$/g, "");
  const [cartId, setCartId] = useState(cleanedCartId);

  console.log("Raw cartId from localStorage:", rawCartId);
  console.log("Cleaned cartId used:", cleanedCartId);

  const { data, loading } = useQuery(GET_PAYMENT_METHODS, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (isSignedIn && data) {
        const paymentOptions = data?.cart?.available_payment_methods || [];
      }
    },
    onError: (err) => {
      if (err.message.includes("isn't active")) {
        navigate(`/${locale}/cart`);
      } else {
        console.error(err);
      }
    },
  });

  const paymentOptions = data?.cart?.available_payment_methods || [];

  const [setPaymentMethod, { data: paymentMethodData }] = useMutation(
    SET_PAYMENT_METHOD,
    {
      onCompleted: () => {},
      onError: (err) => {
        toast.error(err.message, { duration: 6000 });
        if (err.message.includes("isn't active")) {
          navigate(`/${locale}/cart`);
        }
      },
    }
  );

  const selectedMethodCode =
    paymentMethodData?.setPaymentMethodOnCart?.cart?.selected_payment_method
      ?.code;

  const handleChangePaymentMode = (code) => {
    setPaymentMethod({
      variables: {
        cartId,
        code,
      },
    });
  };

  const [placeOrderMutation, { loading: placeOrderLoading }] =
    useMutation(PLACE_ORDER);

  const handlePlaceOrder = () => {
    if (!selectedMethodCode) {
      toast.error("Please select a payment method", {
        id: "Please select payment method",
      });
      return;
    }

    setIsRedirecting(true);
    placeOrderMutation({
      variables: { cartId },
      onCompleted: (data) => {
        const orderNumber = data?.placeOrder?.order?.order_number;
        navigate(`/${locale}/payment-receipt?status=1&order_id=${orderNumber}`);
      },
      onError: (err) => {
        setIsRedirecting(false);
        toast.error(err.message, {
          id: "Error in place order",
          duration: 6000,
        });
        navigate(`/${locale}/payment-receipt?status=0`);
      },
    });
  };

  return {
    paymentOptions,
    isLoading: loading,
    handleChangePaymentMode,
    handlePlaceOrder,
    placeOrderLoading,
    isRedirecting,
    selectedMethodCode,
  };
};

export default usePayment;
