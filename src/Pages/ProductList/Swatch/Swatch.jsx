const Swatch = ({ colorSwatch }) => {
  if (!colorSwatch?.length) return null;

  return (
    <div className="flex items-center gap-x-2 mb-[15px]">
      {colorSwatch?.slice(0, 3)?.map((item, key) => (
        <span
          key={key}
          style={{ backgroundColor: item?.swatch_data?.value }}
          className="w-4 h-4  rounded-full"
        ></span>
      ))}
      {colorSwatch?.length > 3 && (
        <span className="mobile:text-15 text-14">{`+${
          colorSwatch?.length - 3
        }`}</span>
      )}
    </div>
  );
};

export default Swatch;
