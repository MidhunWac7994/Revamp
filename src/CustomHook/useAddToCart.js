import { useMutation, gql } from "@apollo/client";
import { cartIdAtom } from "../Jotai/cartIdAtom";         
import { useAtomValue } from "jotai";

const ADD_TO_CART = gql `
  mutation AddProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        items {
          product {
            sku
            stock_status
          }
        }
      }
    }
  }
`;


const useAddToCart = () => {
  const cartId = useAtomValue(cartIdAtom); 
  const [addToCart, { loading, error, data }] = useMutation(ADD_TO_CART, {
    refetchQueries: ["GetCartDetails"],
  });

  const handleAddToCart = async (cartItems) => {
    if (!cartId) {
      console.error("Cart ID is not available");
      return null;
    }
    console.log(cartId, "cartId in useAddToCart");
    console.log(cartItems, "cartItems in useAddToCart");

    try {
      const response = await addToCart({
        variables: {
          cartId, 
          cartItems,
        },
      });

      console.log("Add to cart successful:", response.data);
      return response.data;
    } catch (err) {
      console.error("Add to cart error:", err.message);
      return null;
    }
  };

  return {
    handleAddToCart,
    loading,
    error,
    data,
  };
};

export default useAddToCart;
