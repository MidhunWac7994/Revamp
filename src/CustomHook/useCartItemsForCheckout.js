import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCartConfig from './useCartConfig';

const useCartItemsForCheckout = () => {
  const navigate = useNavigate();
  const { cartId, fetchCartId } = useCartConfig();

  const {
    data,
    loading,
    refetch: mutateCartItemsCheckout,
    error,
    networkStatus,
  } = useQuery(GET_CART_DETAILS, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });


  if (error) {
    console.error(error.message);
    if (error.message === `The cart isn't active.`) {
      fetchCartId();
    } else if (
      error.message.includes(
        "The current user cannot perform operations on cart"
      )
    ) {
      fetchCartId();
    } else {
      toast.error(error.message);
      navigate("/");
    }
  }

  const cartItems = data?.cart?.items ?? [];

  if (!loading && cartItems.length === 0) {
    toast.error("Your cart is empty. Continue shopping");
    navigate("/");
  }

  const isOutOfStock = cartItems.some(
    (item) => !item?.is_stock_available_for_item
  );
  if (!loading && isOutOfStock) {
    toast.error("Some of the product in your cart is out of stock!", {
      duration: 6000,
    });
    navigate("/cart");
  }

  const isInStock = cartItems.length > 0 && !isOutOfStock;

  return {
    cartItems,
    isInStock,
    loading: loading || networkStatus === 4,
    mutateCartItemsCheckout,
  };
};

export default useCartItemsForCheckout;


const GET_CART_DETAILS = gql `
  query GetCartDetailsForCheckout($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      items {
        id
        strike_price
        is_stock_available_for_item
        product {
          id
          store_pickup_available
          lead_time
          # delivery_type is required to check the product delivery type
          delivery_type
          product_delivery_type
          sku
          name
          thumbnail {
            url
          }
        }
        prices {
          row_total {
            value
          }
        }
      }
    }
  }
`;
