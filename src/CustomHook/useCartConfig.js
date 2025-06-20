"use client";
import { useAtom } from "jotai";
import { useMutation, gql } from "@apollo/client";
import { cartIdAtom } from '../Jotai/cartIdAtom'

export const CREATE_CART_MUTATION = gql`
  mutation CreateNewCart {
    cartId: createEmptyCart
  }
`;

const useCartConfig = () => {
  const [cartId, setCartId] = useAtom(cartIdAtom);

  const [createCartMutation, { loading }] = useMutation(CREATE_CART_MUTATION, {
    onError: (err) => {
      console.error("Error creating cart:", err);
    },
  });

  const fetchCartId = async (doNotSetToState = false) => {
    try {
      const { data } = await createCartMutation();
      const newCartId = data?.cartId;

      if (newCartId && !doNotSetToState) {
        setCartId(newCartId); 
      }

      return { cartId: newCartId };
    } catch (error) {
      console.error("Fetch cart failed:", error);
      return {};
    }         
  };

  return {
      fetchCartId,
    cartId,
    setCartId,
    loading,
  };                            
};

export default useCartConfig;
