import Gateway from "./GateWay";
import { CASH_ON_DELIVERY } from "././../../Constants" 

const PaymentMethods = (props) => {
  const {
    mode,
    handleChangePaymentMode,
    checked,
    handlePlaceOrder,
    placeOrderLoading,
    icon,
    settingPaymentMethod,
    isLoading,
    isRedirecting,
    active,
  } = props;

  if (mode?.code === CASH_ON_DELIVERY) {
    return (
      <Gateway
        handleChangePaymentMode={handleChangePaymentMode}
        checked={checked}
        mode={mode}
        handlePlaceOrder={handlePlaceOrder}
        placeOrderLoading={placeOrderLoading}
        icon={icon}
        settingPaymentMethod={settingPaymentMethod}
        isLoading={isLoading}
        isRedirecting={isRedirecting}
        active={active}
      />
    );
  }

  return null;
};

export default PaymentMethods;
