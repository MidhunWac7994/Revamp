import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAIL, GET_PDP_BREADCRUMB } from "./DetailQuery";
import ProductFullDetails from  '../../components/ProductFulldetail/ProductFullDetail';
import EmptyPages from "../../components/EmptyPages/EmptyPages";

const ProductDetail = (props) => {
  const { url, locale, key, version } = props;

  
  const {
    data: productData,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(GET_PRODUCT_DETAIL, {
    variables: { url_key: url, locale, key, version },
    context: {},
  });

  const {
    data: breadcrumbData,
    loading: loadingBreadcrumb,
    error: errorBreadcrumb,
  } = useQuery(GET_PDP_BREADCRUMB, {
    variables: { url_key: url, locale, key, version },
    context: {},
  });

  if (loadingProduct || loadingBreadcrumb) return <div>Loading...</div>;
  if (errorProduct || errorBreadcrumb)
    return <div>Error loading product or breadcrumb data.</div>;

  const productDetails = productData?.products?.items?.[0] || null;
  const itemLength = productData?.products?.items?.length || 0;
  const breadcrumbs =
    breadcrumbData?.products?.items?.[0]?.pdp_breadcrumbs || [];

    console.log(productDetails, "productDetails");

    if (itemLength === 0 || !productDetails) {
      return <EmptyPages />;
    }

  return (
    
    <ProductFullDetails
      productDetails={productDetails}
      itemLength={itemLength}
      url={url}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default ProductDetail;
