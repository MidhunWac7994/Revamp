import React, { useEffect } from "react";
import { cartIdAtom } from '../../Jotai/cartIdAtom';
import { useSetAtom } from "jotai";
import { CARTID_KEY } from "../Constants";
import { gql, useMutation } from "@apollo/client";
import { CREATE_CART_MUTATION } from "../../CustomHook/useCartConfig";
 
function InitialCart() {
  const setCartId = useSetAtom(cartIdAtom);

  const [createTemporaryCartId] = useMutation(CREATE_CART_MUTATION);

  const fetchTemporaryCartId = async () => {
    try {
      const { data } = await createTemporaryCartId();
      const temporaryCartId = data?.cartId;

      if (temporaryCartId) {
        localStorage.setItem(CARTID_KEY, temporaryCartId);
        setCartId(temporaryCartId);
      }
    } catch (err) {
      console.error("Error creating cart ID:", err);
    }
  };

  useEffect(() => {
    const existingTemporaryCartId = localStorage.getItem(CARTID_KEY);

    if (!existingTemporaryCartId) {
      
      fetchTemporaryCartId();
    }
  }, []);

  return;
}

export default InitialCart;
