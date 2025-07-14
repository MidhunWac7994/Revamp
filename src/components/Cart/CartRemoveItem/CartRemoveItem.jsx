import { Trash2 } from "lucide-react";
import {useToggle} from '../../../CustomHook/useToggle';
import DuelPopup from  '../../DuelPopUp/DuelPopUp';
import CartRemoveDialogue from "./CartRemoveDialogue";

const CartRemoveItem = (props) => {
  const { status, toggle } = useToggle();
  const {
    itemsForGtm,
    mutateLocalApi,
    product,
    hideButton,
    statusCheckout,
    toggleCheckout,
    isCheckout,
    disabled,
    toggleMiniCart,
  } = props;

  return (
    <DuelPopup
      status={isCheckout ? statusCheckout : status}
      toggle={isCheckout ? toggleCheckout : toggle}
      hideButton={hideButton}
      triggerButton={
        <button
          disabled={disabled}
          className="text-black text-14 flex items-center gap-x-[6px] transition-all duration-300 hover:text-[#56c4b9] font-light px-2 py-1 rounded"
        >
          <Trash2 size={16} />
          Remove
        </button>
      }
    >
      <CartRemoveDialogue
        product={product}
        setFalse={isCheckout ? toggleCheckout : toggle}
        mutateLocalApi={mutateLocalApi}
        itemsForGtm={itemsForGtm}
        isCheckout={isCheckout}
        toggleMiniCart={toggleMiniCart}
      />
    </DuelPopup>
  );
};

export default CartRemoveItem;
