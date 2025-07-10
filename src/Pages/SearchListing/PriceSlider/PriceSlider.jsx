import usePriceSlider from "./useParamsSlider";
import { useParams } from "react-router-dom";
import { CURRENCY_CODE } from  "../../../components/Constants"
import { Progress } from  "../../../components/components/ui/progress";

const PriceSlider = (props) => {
  const { priceOptions, isMobileFilter, handleSelectedFilterMobile } = props;
  const { locale } = useParams();

  const currentLocale = locale || "en";

  const { range, min, max } = usePriceSlider(
    priceOptions,
    isMobileFilter,
    handleSelectedFilterMobile
  );

  const progressValue =
    max > min ? ((range?.max - min) / (max - min)) * 100 : 0;

  return (
    <div className="mt-4 pb-[30px] px-[3px]">
      <Progress value={progressValue} />
      <div className="flex justify-between text-sm text-gray-700 mt-4">
        <span>
          {CURRENCY_CODE} {range?.min}
        </span>
        <span>
          {CURRENCY_CODE} {range?.max}
        </span>
      </div>
    </div>
  );
};

export default PriceSlider;
