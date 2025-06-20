import React from "react";
import { cn } from "../lib/utils";
import useProductActionButtons from "./useProductActionButtons";
import AddToCartButton from "../AddtoCartButton";
import ProductCounter from "../ProductCounter/ProductCounter";
import { Link, useParams } from "react-router-dom"; // ✅ Import useParams

const ProductActionButtons = (props) => {
  const {
    disabled,
    sku,
    selectedVariantsUid,
    handleClose,
    isPDP,
    isDetailStrip,
    handleRemove,
    wishlistItemsId,
    noCounter,
    wrapClass,
    id,
    name,
    handleRemoveSaved,
    btnClassName,
    variant = "primary",
    size,
    isShopByLook,
    throwError,
  } = props;

  const { handleDecrement, handleIncrement, handleReset, qty } =
    useProductActionButtons();

  const { locale } = useParams(); // ✅ Get locale from route params

  const cartItem = { qty, sku, selectedVariantsUid };

  const renderWishlistButton = null;

  const renderCartButtons = () => (
    <div className="flex flex-col md:flex-row gap-3">
      <AddToCartButton
        productId={id}
        productName={name}
        productSku={sku}
        className="w-[250px] h-[50px] px-5 py-2.5 bg-black text-sm hover:bg-[#4D4D4D]"
        size="md"
        disabled={disabled}
        itemsForCart={[cartItem]}
        handleReset={handleReset}
        throwError={throwError}
      />
      <Link to={`/${locale}/cart`}>
        {" "}
        {/* ✅ Use dynamic locale */}
        <AddToCartButton
          productId={id}
          productName={name}
          productSku={sku}
          className="w-[250px] h-[50px] px-5 py-2.5 text-sm"
          variant="primary"
          size="md"
          disabled={disabled}
          label="Buy Now"
          isBuyNow
          itemsForCart={[cartItem]}
          handleReset={handleReset}
          throwError={throwError}
        />
      </Link>
    </div>
  );

  return (
    <>
      {!noCounter && (
        <ProductCounter
          disabled={disabled}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          qty={qty}
          size={size}
        />
      )}

      {isPDP ? (
        <div className={cn("flex gap-5 w-full mt-5", wrapClass)}>
          {renderCartButtons()}
        </div>
      ) : isDetailStrip ? (
        <>
          {renderCartButtons()}
          {renderWishlistButton}
        </>
      ) : (
        <>
          <AddToCartButton
            productId={id}
            productName={name}
            className={cn("w-full min-w-auto max-w-full", btnClassName)}
            variant={variant}
            size="xl"
            disabled={disabled}
            itemsForCart={[cartItem]}
            handleClose={handleClose}
            handleRemove={handleRemove}
            wishlistItemsId={wishlistItemsId}
            handleReset={handleReset}
            id={id}
            handleRemoveSaved={handleRemoveSaved}
            throwError={throwError}
          />
          {!isShopByLook && renderWishlistButton}
        </>
      )}
    </>
  );
};

export default ProductActionButtons;
