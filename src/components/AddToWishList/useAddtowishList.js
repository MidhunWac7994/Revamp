import { useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  ADD_PRODUCTS_TO_WISHLIST,
  GET_CUSTOMER_WISHLIST,
  REMOVE_FROM_WISHLIST_MUTATION,
} from './AddproductToWishListQuery'
import { useGlobalData } from '../../CustomHook/useGlobalData';

const useAddToWishlist = ({ productsToWishilist, isCheckout }) => {
  const { isSignedIn, wishlistId } = useGlobalData();
  const wishlistProductRef = useRef(null);

  const {
    data,
    loading: creatingWishlist,
    refetch,
  } = useQuery(GET_CUSTOMER_WISHLIST, {
    skip: !isSignedIn,
    fetchPolicy: "cache-and-network",
  });

  const [addToWishlistMutation, { loading: adding }] = useMutation(
    ADD_PRODUCTS_TO_WISHLIST,
    {
      onCompleted: () => {
        toast.success("Product added to wishlist", { id: "wishlist-add" });
        wishlistProductRef.current = null;
      },
      onError: (error) => {
        toast.error(error.message || "Failed to add to wishlist", {
          id: "wishlist-add-error",
          duration: 6000,
        });
      },
    }
  );

  const [removeFromWishlistMutation, { loading: removing }] = useMutation(
    REMOVE_FROM_WISHLIST_MUTATION,
    {
      onCompleted: () => {
        toast.success("Product removed from wishlist", {
          id: "wishlist-remove",
        });
      },
      onError: () => {
        toast.error("Failed to remove product from wishlist", {
          id: "wishlist-remove-error",
        });
      },
    }
  );

  const wishlistItems = data?.customer?.wishlists?.[0]?.items ?? [];
  const wishlistItemsSku = wishlistItems.map((item) => item?.product?.sku);

  const matchedIds = wishlistItems
    .filter((item) =>
      productsToWishilist.some((p) => p?.sku === item?.product?.sku)
    )
    .map((item) => item?.id);

  const isInWishlist = productsToWishilist?.some((product) =>
    wishlistItemsSku.includes(product?.sku)
  );

  useEffect(() => {
    if (isSignedIn && wishlistId && wishlistProductRef.current && !isCheckout) {
      addToWishlistMutation({ variables: { wishlistId, productsToWishilist } });
    }
  }, [isSignedIn, wishlistId, wishlistProductRef.current]);

  const handleWishlistIconClick = useCallback(async () => {
    if (isSignedIn) {
      if (!isInWishlist) {
        await addToWishlistMutation({
          variables: { wishlistId, productsToWishilist },
        });
        refetch();
      } else if (matchedIds.length > 0) {
        await removeFromWishlistMutation({
          variables: {
            wishlistId,
            wishlistItemsIds: matchedIds,
          },
        });
        refetch();
      }
    } else {
      wishlistProductRef.current = true;

      // If you want to toggle auth modal without nuqs, do it manually:
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("auth", "true");
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);

      // Then trigger modal manually via your auth system
    }
  }, [isSignedIn, isInWishlist, matchedIds, wishlistId, productsToWishilist]);

  const productNotInWishlist = productsToWishilist?.filter(
    (product) => !wishlistItemsSku.includes(product?.sku)
  );

  const isEveryItemsInWishlist = productsToWishilist?.every((product) =>
    wishlistItemsSku.includes(product?.sku)
  );

  const handleWishlistForCheckout = async () => {
    if (!isEveryItemsInWishlist) {
      const itemsToAdd =
        productNotInWishlist?.length > 0
          ? productNotInWishlist
          : productsToWishilist;

      await addToWishlistMutation({
        variables: {
          wishlistId,
          productsToWishilist: itemsToAdd,
        },
      });

      refetch();
    }
  };

  return {
    handleWishlistIconClick,
    handleWishlistForCheckout,
    isInWishlist,
    adding,
    removing,
    creatingWishlist,
  };
};

export default useAddToWishlist;
