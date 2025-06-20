
const ProductCounter = (props) => {
  const {
    size = "size-[51px]",
    disabled,
    handleDecrement,
    handleIncrement,
    qty,
    disableIncrement,
    disableDecrement,
  } = props;

  return (
    <div data-widget="ProductCounter" className="flex w-max">
      <button
        disabled={disabled || disableDecrement}
        className={`${size} border border-lw-grey flex items-center justify-center text-20 border-e-0 ${
          disabled ? "opacity-50" : ""
        }`}
        onClick={handleDecrement}
      >
        -
      </button>
      <span
        className={`border flex items-center justify-center bg-white !text-black font-semibold px-2 min-w-[51px] text-16 !w-max ${size}`}
      >
        {qty}
      </span>

      <button
        disabled={disabled || disableIncrement}
        className={`${size} border border-lw-grey  flex items-center justify-center text-20 border-s-0`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default ProductCounter;
