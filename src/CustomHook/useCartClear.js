import { useMutation, useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

const CLEAR_CART = gql`
  mutation ClearCart($cart_id: String!) {
    removeAllItemsFromCart(cart_id: $cart_id)
  }
`;

const useCartClear = () => {
  const client = useApolloClient();

  const [clearCartMutation, { loading: clearCartLoading }] =
    useMutation(CLEAR_CART);

  const handleClearCart = async (newCartId) => {
    try {
      await clearCartMutation({
        variables: { cart_id: newCartId },
      });

      await client.refetchQueries({
        include: ["GetCartItemCount"], 
      });

      
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return { handleClearCart, clearCartLoading };
};

export default useCartClear;
