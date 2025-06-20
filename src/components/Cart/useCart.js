import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@apollo/client";
import { useGlobalData } from '../../CustomHook/useGlobalData';
import useCartConfig from '../../CustomHook/useCartConfig';
import {
  GET_CART_RECOMMENDED_PRODUCTS,
  GET_SAVE_FOR_LATER_PRODUCTS,
} from './GetCartDetailQuery';

const useCart = () => {
  const { cartId } = useCartConfig();
  const { isSignedIn } = useGlobalData();
  const navigate = useNavigate();
  const wishlistProductRef = useRef(null);

  
  const {
    data: saveForLaterProductsData,
    loading: saveForLaterLoading,
    error: saveForLaterError,
    refetch: refetchSaveForLater,
  } = useQuery(GET_SAVE_FOR_LATER_PRODUCTS, {
    variables: { cartId },
    skip: !cartId || !isSignedIn,
    fetchPolicy: "cache-and-network",
  });

  
  const {
    data: recommendedCartData,
    loading: recommendedCartLoading,
    error: recommendedCartDataError,
    refetch: refetchRecommendedProducts,
  } = useQuery(GET_CART_RECOMMENDED_PRODUCTS, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
  });

  const recommendedCartProduct =
    recommendedCartData?.cartRelatedProducts?.items || [];

  const handleWishlist = () => {
    if (isSignedIn) {
      navigate("/wishlist");
    } else {
      wishlistProductRef.current = true;
      toast.error("Please sign in to continue", { duration: 3000 });
    }
  };

  return {
    handleWishlist,
    saveForLaterProducts: saveForLaterProductsData,
    saveForLaterLoading,
    saveForLaterError,
    refetchSaveForLater,
    recommendedCartProduct,
    recommendedCartLoading,
    recommendedCartDataError,
    refetchRecommendedProducts,
  };
};

export default useCart;
