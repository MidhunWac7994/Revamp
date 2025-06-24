import React from "react";
import { Link } from "react-router-dom";
import ProductCounter from "../../ProductCounter/ProductCounter";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import useCartItemCounter from "../CartItem/useCartItemCounter";
import useRemoveCartItem from "../CartRemoveItem/useRemoveCartItem";
import Price from "../../Price/Price";
import CartRemoveItem from "../CartRemoveItem/CartRemoveItem";
import { CURRENCY_CODE } from "../../Constants";

const   CartItem = ({
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
      <div
        className={`w-full flex ${inStock ? "items-start" : "items-center"}`}
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
        </div>

        <div
          className={`w-auto flex flex-col flex-[1_1_0]  ml-5 mt-24 gap-y-4 tablet:gap-y-6 ${
            isMiniCart ? "gap-x-[15px]" : "gap-x-5"
          }`}
        >
          <Link to={`/${url_key}`} className="flex flex-col tablet:gap-y-1">
            {!isMiniCart && (
              <span className="text-[12px] tablet:text-13 text-[#8B8B8B] font-light">
                {sku}
              </span>
            )}
            <h3
              className={`text-14 tablet:text-16 text-black ${
                isMiniCart ? "line-clamp-1" : "line-clamp-2"
              }`}
            >
              {name}
            </h3>
          </Link>
       
          {inStock ? (
            <Price
              sizeOffer={"!text-16 font-semibold"}
              sizeNormal={"text-[12px] !text-gray-text"}
              className={
                "flex items-center flex-wrap gap-3 my-3 mobile:hidden ml-auto -mt-2"
              } 
              regularPrice={
                strike_price > prices?.row_total?.value ? strike_price : 0
              }
              offerPrice={prices?.row_total?.value}
            />
          ) : (
            <div className={`mobile:hidden w-full mt-3`}>
              <p className="text-[#FF7777] leading-5 text-18 font-semibold">
                {t("Out_of_stock")}
              </p>
              <p className="mt-2 leading-5 text-[#727272] text-[12px]">
                {t("This item is currently out of stock")}
              </p>
            </div>
          )}
          {selectedVariant && selectedVariant?.length > 0 && inStock && (
            <div className="flex items-center gap-x-3 flex-wrap laptop:mt-[6px] gap-y-[6px]">
              {selectedVariant?.map((item, index) => (
                <span
                  key={item?.value}
                  className={`text-14 text-black font-light leading-4`}
                >
                  {item?.code
                    ?.replace(/_/g, " ")
                    ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  : {item?.label}
                </span>
              ))}
            </div>
          )}
          <div className="-mt-11 ">
            <CartRemoveItem
              product={[
                {
                  quantity,
                  id: Number(id),
                  sku,
                  name,
                  offerPrice: prices?.row_total?.value,
                  normalPrice:
                    strike_price > prices?.row_total?.value ? strike_price : 0,
                  image: thumbnail?.url,
                },
              ]}
              itemsForGtm={{
                item_id: sku,
                item_name: name,
                price: prices?.row_total?.value,
                currency: CURRENCY_CODE,
                quantity: quantity,
              }}
              mutateLocalApi={mutateLocalApi}
              disabled={deletingItem}
              toggleMiniCart={toggle}
            />
          </div>
          <div className="ml-auto ">
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
    </div>
  );
};

export default CartItem;
