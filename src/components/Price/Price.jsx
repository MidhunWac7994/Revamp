import { cn } from '../../components/lib/utils';
import { getFormattedPrice } from '../../utils/getFormattedPrice';
import { useParams } from "react-router-dom";

const  Price = (props) => {
  const {
    regularPrice: normal_amount,
    offerPrice: offer_amount,
    className,
    sizeNormal = "text-16",
    sizeOffer = "text-14",
    discountPercentage,
  } = props;

  const { locale } = useParams(); 

  const regularPrice = !isNaN(normal_amount) ? normal_amount : null;
  const offerPrice = !isNaN(offer_amount) ? offer_amount : null;

  const formattedNormalPrice = getFormattedPrice(locale || "en", regularPrice);                             
  const formattedOfferPrice = getFormattedPrice(locale || "en", offerPrice);

  const regular_price =
    formattedNormalPrice?.length > 0 &&
    formattedNormalPrice.map((val) => (
      <span key={val?.index} className={val?.type}>
        {val?.value}
      </span>
    ));

  const offer_price =
    formattedOfferPrice?.length > 0 &&
    formattedOfferPrice.map((val) => (
      <span key={val?.index} className={val?.type}>
        {val?.value}
      </span>
    ));

  return (
    <div data-widget="Price" className={className}>
      {offerPrice === regularPrice ? (
        <>
          {regular_price && (
            <span className={cn("!text-black font-light", sizeOffer)}>
              {regular_price}
            </span>
          )}
        </>
      ) : (
        <>
          <span className={cn("!text-black font-light", sizeOffer)}>
            {offer_price}
          </span>
          {regular_price && (
            <span className={cn("line-through", sizeNormal)}>
              {regular_price}
            </span>
          )}
          {discountPercentage && (
            <span className="!text-[#E10800] font-medium text-14">
              ({discountPercentage}%)
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Price;
