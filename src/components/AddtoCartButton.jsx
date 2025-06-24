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
  const { handleAddToCart, loading } = useAddToCart();

  const handleClick = async () => {
    const action = isBuyNow ? "Buying now" : "Adding to cart";

    // Basic validation
    if (!productId || !productSku) {
      toast.error("Missing product information. Cannot add to cart.");
      console.error("Add to cart failed due to missing SKU or product ID");
      return;
    }

    const cartItems = [
      {
        quantity: 1,
        sku: productSku,
      },
    ];

    console.log(
      `${action}: ${productName || "Unnamed Product"} (${productId})`
    );
    console.log("Cart Items:", cartItems);

    const result = await handleAddToCart(cartItems);

    if (result) {
      toast.success(`${productName || "Item"} added to the cart!`);
      // If "Buy Now" should trigger navigation or checkout, do it here
    } else {
      toast.error("Failed to add item to the cart.");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`mt-2 h-10 px-6 bg-[#53bcb7] text-white rounded-none hover:bg-[#45a9a4] transition-colors ${className}`}
      disabled={loading}
      {...rest}
    >
      {label || (isBuyNow ? "Buy Now" : "Add to Cart")}
    </Button>
  );
};

export default AddToCartButton;
