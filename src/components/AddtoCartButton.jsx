import { toast } from "sonner";
import { Button } from "./components/ui/button";
import useAddToCart from "../CustomHook/useAddToCart";

const AddToCartButton = ({
  productId,
  productName,
  productSku,
  label,
  isBuyNow,
  className = "",
  ...rest
}) => {
  const { handleAddToCart, loading, error, data } = useAddToCart({});
console.log(productSku, "productSku in AddToCartButton");
  const a = () => {
    const action = isBuyNow ? "Buying now" : "Adding to cart";

    console.log(
      `${action}: ${productName || "Unnamed Product"} (${productId || "No ID"})`
    );

    if (!productId) {
      toast.error("Invalid product, cannot add to cart.");
      return;
    }

    toast.success(`${productName || "Item"} added to the cart!`);
  };

  const cartItems = [
    {
      quantity: 1,
      sku: productSku,
    },
  ];            
  return (
    <Button
      onClick={() => handleAddToCart(cartItems)}
      className={`mt-2 h-10 px-6 bg-[#53bcb7] text-white rounded-none hover:bg-[#45a9a4] transition-colors ${className}`}
      {...rest}
    >
      {label || (isBuyNow ? "Buy Now" : "Add to Cart")}
    </Button>
  );
};

export default AddToCartButton;
