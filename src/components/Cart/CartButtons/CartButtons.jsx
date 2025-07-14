import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import { GUEST_USER_KEY } from "../../Constants";
import { getLocalStorageWithExpiry } from "../../../utils/storageUtil";

const CartButtons = (props) => {
  const { totalQuantity, isInStock } = props;
  const { locale } = useParams();

  const { isSignedIn } = useGlobalData();
  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { mobile } = guestData || {};   

  const guestUrl = mobile
    ? `/guest-checkout?step=customer_address`
    : `/guest-checkout?step=customer_info`;


  return (
    <Link to={`/${locale}/checkout`}>
      <button
        className={`w-full max-w-full mt-6 h-14 rounded-none  bg-[#2cb5a7] text-white  ${
          !isInStock ? "pointer-events-none cursor-not-allowed " : ""
        }`}
        size="xl"
        disabled={!isInStock}
      >
        Checkout
      </button>
    </Link>
  );
};

export default CartButtons;
