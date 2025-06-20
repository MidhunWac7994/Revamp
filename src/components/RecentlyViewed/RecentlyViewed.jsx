import ProductHighlights from "../ProductHighlights";
import useRecentlyViewed from "./useRecentlyViewed";

const RecentlyViewed = (props) => {
  const { product_id, title, containerClass } = props;
  const { recentlyViewedProducts = [], isLoading } = useRecentlyViewed({
    product_id,
  });
  const t = useTranslations();

  return (
    <ProductHighlights
      containerClass={containerClass}
      data={recentlyViewedProducts}
      title={title}
    />
  );
};

export default RecentlyViewed;
