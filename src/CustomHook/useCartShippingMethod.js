import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useCartConfig from "./useCartConfig";

const GET_SELECTED_SHIPPING_METHOD = gql`
  query GetSelectedShippingMethod($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      shipping_addresses {
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
    }
  }
`;

const useCartShippingMethod = () => {
  const { cartId } = useCartConfig();
  const navigate = useNavigate();

  const {
    data,
    loading,
    refetch: mutateShippingMethod,
    networkStatus,
    error,
  } = useQuery(GET_SELECTED_SHIPPING_METHOD, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    onError: () => {
      navigate("/cart");
    },
  });

  const selectedMethod =
    data?.cart?.shipping_addresses?.[0]?.selected_shipping_method;

  return {
    selectedMethod,
    selectedShippingLoading: loading || networkStatus === 4,
    mutateShippingMethod,
  };
};

export default useCartShippingMethod;
