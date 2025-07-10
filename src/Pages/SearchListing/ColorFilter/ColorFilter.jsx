import { useSearchParams } from "react-router-dom";

const ColorFilter = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getColorFromParams = () => {
    const param = searchParams.get("color");
    return param ? param.split(",") : [];
  };

  const color = getColorFromParams();

  const isHexColor = (value) =>
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

  const handleFilterColor = (value) => {
    const currentPage = parseInt(searchParams.get("page")) || 1;

    if (currentPage > 1) {
      searchParams.delete("page");
    }

    const currentColors = getColorFromParams();

    let updatedColors;
    if (currentColors.includes(value)) {
      updatedColors = currentColors.filter((c) => c !== value);
    } else {
      updatedColors = [...currentColors, value];
    }

    if (updatedColors.length > 0) {
      searchParams.set("color", updatedColors.join(","));
    } else {
      searchParams.delete("color");
    }

    setSearchParams(searchParams);
  };

  return (
    <ul className="w-full flex items-center gap-3 pt-1 flex-wrap pb-[30px] px-[3px]">
      {options?.map((item, itemIndex) => {
        const activeColor = color?.includes(item?.value);

        return (
          <li key={itemIndex}>
            <button
              style={{
                backgroundColor: isHexColor(item?.value)
                  ? item?.value
                  : item?.label?.toLowerCase(),
              }}
              className="block w-[24px] relative h-[24px] rounded-full border border-[#f3f3f3]"
              type="button"
              onClick={() => handleFilterColor(item?.value)}
            >
              <span
                className={`border pointer-events-none absolute h-[30px] w-[30px] rounded-full top-[50%] left-[50%] translate-[-50%] transition duration-300 ease-in-out ${
                  activeColor ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  borderColor: isHexColor(item?.value)
                    ? item?.value
                    : item?.label?.toLowerCase(),
                }}
              ></span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ColorFilter;
