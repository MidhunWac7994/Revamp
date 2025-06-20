import { useQuery, gql } from "@apollo/client";
import useCartConfig from "./useCartConfig";


const GET_CART_CUSTOM_PRICES = gql`
  query GetCartCustomPrices($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      custom_prices {
        delivery_free_price
        prices {
          id
          label
          value
          class_name
        }
      }
    }
  }
`;

const useCartCustomPrice = () => {
  const { cartId } = useCartConfig();

  const { data, loading, refetch } = useQuery(GET_CART_CUSTOM_PRICES, {
    variables: { cartId },
    skip: !cartId, 
    fetchPolicy: "cache-and-network", 
  });

  const customPrices = data?.cart?.custom_prices;

  const grandTotal = customPrices?.prices?.find(
    (ele) => ele?.class_name === "grand_total"
  )?.value;

  return {
    customPrices,
    grandTotal,
    customPriceLoading: loading,
    mutateCartPrices: refetch, 
  };
};

export default useCartCustomPrice;
