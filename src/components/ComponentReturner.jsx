import React from "react";
import MinBanner from "./MinBanner/MinBanner";
import ProductsSlider from "./ProductSlider/ProductsSlider";
import MainBanner from "./MainBanner/MainBanner";
import CategorySlider from "./CategorySlider/CategorySlider";
import ShopByLook from "./ShopByLook/ShopByLook";
import ImageWithProduct from "./ImageWithProduct/ImageWithProduct";
import Category_Viewer from "./Categoryviewer/CategoryViewer";
import AboutUs from "./AboutUs/AboutUs";
import Reviews from "./Reviews/Reviews";
import Default from "./Default";
import ThreeImage from "./ThreeImage/ThreeImage";
import InstagramPosts from "./InstaPosts/InstaPosts";

import {
  CATEGORY_SLIDER,
  CATEGORY_VIEWER,
  IMAGE_WITH_PRODUCT,
  MAIN_BANNER,
  MIN_BANNER,
  PRODUCTS_SLIDER,
  REVIEWS,
  SHOP_BY_LOOK,
  SINGLE_IMAGE_BLOCK,
  THREE_IMAGE,
  INSTAGRAM_POSTS,
} from "./Constants";

function ComponentReturner({ homeData }) {
  const components = {
    [MAIN_BANNER]: MainBanner,
    [PRODUCTS_SLIDER]: ProductsSlider,
    [THREE_IMAGE]: ThreeImage,
    [MIN_BANNER]: MinBanner,
    [CATEGORY_SLIDER]: CategorySlider,
    [SHOP_BY_LOOK]: ShopByLook,
    [IMAGE_WITH_PRODUCT]: ImageWithProduct,
    [CATEGORY_VIEWER]: Category_Viewer,
    [SINGLE_IMAGE_BLOCK]: AboutUs,
    [REVIEWS]: Reviews,
    [INSTAGRAM_POSTS]: InstagramPosts,
    DEFAULT: Default,
  };

  const ComponentToRender =
    components[homeData.block_type] || components["DEFAULT"];

  return <ComponentToRender homeData={homeData} />;
}

export default ComponentReturner;
