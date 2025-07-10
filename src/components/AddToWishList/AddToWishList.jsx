import { cn } from ".././lib/utils";
import { Button } from "../../components/components/ui/button";
import useAddToWishlist from "./useAddtowishList";
import { Heart } from "lucide-react";

const AddToWishlist = (props) => {
  const { sku, size = 24, className, isCart, iconName, handleRemove } = props;

  const productsToWishilist = [
    {
      sku,
      quantity: 1,
    },
  ];

  const {
    handleWishlistIconClick,
    isInWishlist,
    adding,
    removing,
    creatingWishlist,
  } = useAddToWishlist({
    productsToWishilist,
  });

  const IconToShow = (
    <Heart
      size={size}
      stroke={isInWishlist ? "#C1152D" : "currentColor"}
      fill={isInWishlist ? "#C1152D" : "none"}
    />
  );

  const handleClick = async () => {
    if (isCart) {
      await handleRemove?.();
      handleWishlistIconClick();
    } else {
      handleWishlistIconClick();
    }
  };

  return (
    <Button
      data-widget="AddToWishlist"
      onClick={handleClick}
      disabled={adding || removing || creatingWishlist}
      className={`${cn(
        "size-12 text-14 !px-0 font-semibold rounded-[50px] border border-gray-border",
        className
      )} ${isInWishlist ? "hover:bg-white hover:border-white" : ""}`}
      variant={"roundedWhite"}
    >
      {IconToShow}
      {iconName && (
        <span>{isInWishlist ? "Wishlisted" : "Move to Wishlist"}</span>
      )}
    </Button>
  );
};

export default AddToWishlist;
