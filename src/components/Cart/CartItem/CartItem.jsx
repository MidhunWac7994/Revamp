import React from "react";
import { Link } from "react-router-dom";
import ProductCounter from "../../ProductCounter/ProductCounter";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import useCartItemCounter from '../CartItem/useCartItemCounter'
import useRemoveCartItem from  '../CartRemoveItem/useRemoveCartItem'; 

const CartItem = ({
  isMiniCart,
  cartItem = {},
  mutateCartItems,
  mutateCartPrices,
  mutateSaveForLater,
  toggle,
}) => {
  const { isSignedIn } = useGlobalData();

  const {
    product,
    id,
    uid,
    prices = {},
    strike_price,
    quantity,
    customizable_options,
  } = cartItem;

  const {
    stock_status,
    thumbnail,
    name,
    url_key,
    sku,
    id: product_id,
  } = product || {};

  const { handleUpdateIncrement, handleUpdateDecrement, updatingCount } =
    useCartItemCounter({
      quantity,
      uid,
      mutateCartItems,
      mutateCartPrices,
    });

  const mutateLocalApi = () => {
    mutateCartItems?.();
    mutateCartPrices?.();
  };

  const { handleRemove, deletingItem } = useRemoveCartItem({
    itemId: [Number(id)],
    refetchQueries: ["GetCartItemCount", "GetCartUniqueId"],
    mutateLocalApi,
    toggle,
  });

  const t = (key) => (key === "InStock" ? "In Stock" : "Out of Stock");

  const stockStatus =
    stock_status === "IN_STOCK" ? t("InStock") : t("Out_of_stock");
  const inStock = stockStatus === "In Stock";

  const selectedVariant =
    cartItem.__typename === "ConfigurableCartItem"
      ? cartItem?.configured_variant?.custom_attribute_details
      : cartItem?.product?.custom_attribute_details;

  return (
    <div
      className={`flex items-start gap-x-5 gap-y-6 mb-5 pb-5 tablet:pb-7 tablet:mb-7 border-b border-border-color max-mobile:group-last:border-b-0 group-last:mb-0 flex-wrap`}
      data-widget="CartItem"
    >
      <div className="flex-[0_0_100px] max-w-[100px]">
        <Link to={`/${url_key}`} className="block">
          <figure className="relative before:block before:pb-[100%] w-full before:bg-image-bg">
            {thumbnail?.url ? (
              <img
                src={thumbnail.url}
                alt={name}
                className="object-cover"
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 33vw, 33vw"
              />
            ) : (
              <img
                src="/placeholder.png"
                alt="placeholder"
                className="object-cover"
              />
            )}
          </figure>
        </Link>
        <div className="mobile:hidden mt-2">
          <ProductCounter
            size={"w-[33px] h-[33px] !min-w-[33px]"}
            qty={quantity}
            stockStatus={stockStatus}
            updatingCount={updatingCount}
            handleIncrement={handleUpdateIncrement}
            handleDecrement={handleUpdateDecrement}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
