import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TO_RECENTLY_VIEWED,
  GET_RECENTLY_VIEWED,
} from  '../../Pages/ProductDetail/DetailQuery';
import useCartConfig from "../../CustomHook/useCartConfig";

const useRecentlyViewed = ({ product_id }) => {
  const { cartId } = useCartConfig();


  const version = localStorage.getItem("product_version");


  const [addToRecentlyViewed] = useMutation(ADD_TO_RECENTLY_VIEWED);

  useEffect(() => {
    if (cartId && product_id) {
      addToRecentlyViewed({ variables: { cartId, productId: product_id } });
    }
  }, [cartId, product_id, addToRecentlyViewed]);


  const { data, loading, error } = useQuery(GET_RECENTLY_VIEWED, {
    variables: { cartId, current_product_id: product_id },
    skip: !cartId, 
    context: {
      headers: { skipAuthHeader: true }, 
    },
  });

  const recentlyViewedProducts = data?.getRecentlyviewedProducts;

  return { recentlyViewedProducts, loading, error };
};

export default useRecentlyViewed;
