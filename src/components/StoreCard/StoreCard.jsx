const StoreCard = (props) => {
  const {
    content,
    isCheckout,
    isCheckoutCard,
    handleClick,
    isMutating = false,
    isSelectedStore,
    jsxComponent,
    active,
  } = props;
  const Comp = isCheckout || isSelectedStore ? "button" : "div";

  return (
    <Comp
      disabled={isMutating}
      {...(isCheckout ? { type: "button" } : {})}
      className={`p-4 ${
        isCheckoutCard ? "tablet:w-1/2" : ""
      } relative border transition duration-300 ease-in-out ${
        active === content?.pickup_location_code
          ? " border-black bg-white"
          : " border-transparent bg-gray-bg-1"
      }`}
      {...(typeof handleClick === "function" && {
        onClick: () => handleClick(isSelectedStore ? null : content),
      })}
    >
      <div className="flex items-center justify-between">
        <p className="text-16 font-medium text-black leading-5 line-clamp-1">
          {content?.name}
        </p>
      </div>
      <p className="mt-2 line-clamp-1 text-14 font-normal tracking-wide text-black leading-5">
        {content?.street}
      </p>
      <div className="mt-4 flex gap-1 items-center">
        {content?.open_time && (
          <p className="text-black text-14 font-normal tracking-wide leading-5">
            Open {content?.open_time}
          </p>
        )}
        <div className="flex-[0_0_16px] w-4 h-4 flex items-center justify-center">
          <span className="block w-[5px] h-[5px] bg-input-color rounded-full"></span>
        </div>
        {content?.close_time && (
          <p className="text-black text-14 font-normal tracking-wide leading-5">
            Close {content?.close_time}
          </p>
        )}
      </div>
      {jsxComponent && jsxComponent}
    </Comp>
  );
};

export default StoreCard;
