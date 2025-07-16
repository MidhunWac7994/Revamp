import Gateway from "./GateWay"; // If you have other gateways
import MyFatoorah from "./MyFatoorah";
import { CASH_ON_DELIVERY, MYFATOORAH } from "./../../Constants";

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
    myFatoorahConfig,
  } = props;

  if (mode?.code === MYFATOORAH) {
    return (
      <MyFatoorah
        myFatoorahConfig={myFatoorahConfig}
        handleChangePaymentMode={handleChangePaymentMode}
        mode={mode}
        placeOrderLoading={placeOrderLoading}
        settingPaymentMethod={settingPaymentMethod}
        isLoading={isLoading}
        isRedirecting={isRedirecting}
        active={active}
        handlePlaceOrder={handlePlaceOrder}
      />
    );
  }

  if (mode?.code === CASH_ON_DELIVERY) {
    return (
      <Gateway
        icon={icon}
        active={active}
        mode={mode}
        checked={checked}
        handleChangePaymentMode={handleChangePaymentMode}
      />
    );
  }

  return null;
};

export default PaymentMethods;
