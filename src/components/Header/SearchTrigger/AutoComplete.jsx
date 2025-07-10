import { useFormState } from "informed";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 
import useAutoComplete from "./useAutoComplete";
import Price from "../../Price/Price"
import PopularSearch from "./PopularSearch";

const AutoComplete = ({ toggle }) => {
  const formState = useFormState();
  const inputValue = formState?.values?.search_input;
  const hasValue = !!inputValue;

  const { isLoading, error, filteredResult, suggestionsSentance } =
    useAutoComplete({ inputValue, hasValue });

  if (
    (suggestionsSentance?.length === 0 && filteredResult?.length === 0) ||
    error ||
    isLoading
  ) {
    return null;
  }

  return (
    <div
      data-widget="AutoComplete"
      className="tablet:mt-10 max-laptop:px-5 max-mobile:py-9 mobile:flex tablet:gap-[80px] justify-between max-mobile:overflow-y-auto max-mobile:max-h-[calc(100svh-64px)]"
    >
      {suggestionsSentance?.length > 0 && (
        <div className="flex-1">
          <h2 className="text-14 font-medium text-black uppercase leading-6 tracking-wider">
            Search Results
          </h2>
          <ul className="mt-4 p-0 overflow-y-auto search-wrap mobile:max-h-[45vh] tablet:max-h-[calc(45vh-185px)] laptop:max-h-[calc(55vh-185px)] tablet:pe-[10px]">
            {suggestionsSentance.map((item, index) => (
              <li key={index} className="group">
                <Link
                  to={`/search?query=${encodeURIComponent(item)}`}
                  onClick={toggle}
                  className="max-mobile:py-[10px] py-3 block leading-5 text-14 font-light tracking-wide text-black hover:text-lw-primary transition ease-in-out duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredResult?.length > 0 && (
        <div className="laptop:flex-[0_0_730px] mb-[30px]">
          <h3 className="max-mobile:mt-[26px] text-14 font-medium text-black uppercase leading-6 tracking-wider">
            Product Suggestions
          </h3>

          <div className="grid grid-cols-1 tabletPro:grid-cols-2 grid-flow-dense gap-[15px] tabletPro:gap-[30px] mt-6 tabletPro:mt-[30px] search-wrap overflow-y-auto mobile:max-h-[45vh] tablet:max-h-[calc(45vh-185px)] laptop:max-h-[calc(55vh-185px)] tablet:pe-[10px]">
            {filteredResult.map((data, index) => {
              const {
                price,
                sale_price,
                title,
                image_link,
                url_key,
                discount_percentage,
              } = data;

              const regularPrice = price;
              const currentPrice = sale_price;

              return (
                <div key={index}>
                  <Link
                    to={url_key}
                    className="group flex items-center gap-4 tablet:gap-5"
                    onClick={toggle}
                  >
                    <div className="relative overflow-hidden flex-[0_0_75px] tabletPro:flex-[0_0_70px] aspect-square max-w-[75px] tabletPro:max-w-[70px]">
                      <img
                        fill
                        src={image_link}
                        alt={title}
                        className="group-hover:scale-[1.05] transition ease-in-out duration-300 will-change-transform"
                        sizes="12vw"
                      />
                    </div>
                    <div className="max-mobile:flex max-mobile:items-center max-mobile:justify-between max-mobile:gap-5 flex-1 overflow-hidden">
                      {title && (
                        <div className="flex items-center gap-[5px]">
                          <p className="text-15 tablet:text-16 font-normal text-black leading-5 line-clamp-2 tablet:line-clamp-1">
                            {title}
                          </p>
                          <ArrowRight
                            size={14}
                            stroke="#000"
                            className="!hidden tablet:block group-hover:translate-x-[3px] transition ease-in-out duration-300 will-change-transform"
                          />
                        </div>
                      )}
                      <div className="tablet:mt-3">
                        <Price
                          normalPrice={!!discount_percentage && regularPrice}
                          offerPrice={currentPrice}
                          sizeOffer="!text-13 tablet:!text-16 font-normal text-black"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mobile:hidden">
        <PopularSearch />
      </div>
    </div>
  );
};

export default AutoComplete;
