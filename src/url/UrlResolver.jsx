// UrlResolver.jsx
import React, { useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "../Pages/ProductList/ProductList";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";

const URL_RESOLVER_QUERY = gql`
  query GeturlResolver($url: String!) {
    urlResolver(url: $url) {
      canonical_url
      entity_uid
      id
      redirectCode
      relative_url
      type
      cms_type
      meta_title
      meta_description
      meta_keywords
      product_sku
      have_category_banner
      cms_page_id_for_app
      og_image
    }
  }
`;

const UrlResolver = () => {
  const { "*": wildcardPath } = useParams();
  const navigate = useNavigate();

  const pathSegments = (wildcardPath || "").split("/").filter(Boolean);
  const flatUrl = pathSegments[0] || ""; // e.g., "living-room"
  const page = parseInt(pathSegments[1], 10) || 1;

  const { loading, error, data } = useQuery(URL_RESOLVER_QUERY, {
    variables: { url: flatUrl },
  });
 
   
  useEffect(() => {
    if (
      !loading &&
      data?.urlResolver?.redirectCode === 301 &&
      data.urlResolver.relative_url
    ) {
      navigate(`/${data.urlResolver.relative_url}`, { replace: true });
    }
  }, [data, loading, navigate]);

  if (error || !data?.urlResolver?.id) return <h1>404 - Not Found</h1>;

  const resolver = data.urlResolver;
  const pageType = resolver.type;
  const cmsPageType = resolver.cms_type;

  const renderPage = () => {
    switch (pageType) {
      case "CATEGORY":
        return (
          <ProductList
            categoryId={parseInt(resolver.id)}
            categoryName={flatUrl.replace(/-/g, " ")}
            categoryUrlKey={flatUrl}
            page={page}
          />
        );

      case "PRODUCT":
        return <ProductDetail url={flatUrl} page={page} pageType={pageType} />;

      case "CMS_PAGE":
        switch (cmsPageType) {
          case "WIDGET":
          case "HTML":
            return <h1>CMS Page</h1>;
          default:
            return <h1>404 - Page Not Found</h1>;
        }

      default:
        return <h1>404 - Page Not Found</h1>;
    }
  };

  return renderPage();
};

export default UrlResolver;
