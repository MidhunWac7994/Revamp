import Spinner from '../../../Spinner/Spinner'
import { Button } from '../../../components/ui/button';
import useAddToWishlist from '../../../AddToWishList/useAddtowishList';

const ForLoginUser = (props) => {
  const { handleRemove, deletingItem, productsToWishilist } = props;

  const { handleWishlistForCheckout, adding, creatingWishlist } =
    useAddToWishlist({
      productsToWishilist,
      isCheckout: true,
    });

  const handleProduct = async () => {
    await handleWishlistForCheckout();
    handleRemove?.();
  };

  return (
    <Button
      variant={"primary"}
      className="flex-1 h-[50px] px-2"
      onClick={handleProduct}
      disabled={deletingItem || adding || creatingWishlist}
    >
      {deletingItem || adding ? <Spinner /> : "Move to wishlist"}
    </Button>
  );
};

export default ForLoginUser;
