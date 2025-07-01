import Spinner from "../../Spinner/Spinner";    
import { Button } from "../../../components/components/ui/button";

const Gateway = ({
  handleChangePaymentMode,
  mode,
  handlePlaceOrder,
  placeOrderLoading,
  settingPaymentMethod,
  isLoading,
  isRedirecting,
  active,
}) => {
  const isSelected = active === mode?.code;

  return (
    <div className="gateway-wrapper">
      <button
        onClick={() => handleChangePaymentMode(mode?.code)}
        className="payment-option-button"
        disabled={
          isLoading ||
          settingPaymentMethod ||
          isRedirecting ||
          placeOrderLoading
        }
      >
        <span className={`radio-outer ${isSelected ? "radio-active" : ""}`}>
          <span
            className={`radio-inner ${isSelected ? "visible" : "hidden"}`}
          ></span>
        </span>
        {mode?.title}
      </button>

      {isSelected && (
        <div className="pay-now-wrapper">
          <Button
            disabled={placeOrderLoading || isRedirecting}
            variant="primary"
            size="xl"
            onClick={handlePlaceOrder}
          >
            {placeOrderLoading || isRedirecting ? (
              <Spinner className="border-white" />
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gateway;
