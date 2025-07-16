const Gateway = ({
  handleChangePaymentMode,
  mode,
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
        className="payment-option-button flex items-center gap-3"
        disabled={
          isLoading ||
          settingPaymentMethod ||
          isRedirecting ||
          placeOrderLoading
        }
      >
        {/* Radio-like circle */}
        <span className={`radio-outer ${isSelected ? "radio-active" : ""}`}>
          <span
            className={`radio-inner ${isSelected ? "visible" : "hidden"}`}
          ></span>
        </span>

        {/* Native radio for accessibility */}
        <input
          type="radio"
          checked={isSelected}
          onChange={() => handleChangePaymentMode(mode?.code)}
          className="form-radio accent-primary cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />

        <span>{mode?.title}</span>
      </button>
    </div>
  );
};

export default Gateway;
