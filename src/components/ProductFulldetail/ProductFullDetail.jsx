import React from "react";
import useProductDetail from "./useproductDetail";
import { getVariantsUid } from "../../utils/selectedVariantsUid";
import DetailButtons from "../DetailButtons/DetailButtons";
import PaymentDetails from "../PaymentDetails/PaymentDetails";
import ExpectedDelivery from "../ExpectedDelivery/ExpectedDelivery";
import AvailableStores from "../AvailableStores/AvailableStores";

const ProductFullDetails = ({
  productDetails,
  itemLength,
  url,
  breadcrumbs,
}) => {
  if (!productDetails) return <div>No product found.</div>;

  // Extract custom hook values
  const {
    handleSelectConfig,
    productItem = {},
    selectedConfig,
    combinationNotFound,
  } = useProductDetail({ productDetails });

  // Extract product details and provide defaults where needed
  const {
    name,
    sku,
    stock_status,
    media_gallery,
    price_range,
    custom_product_widgets,
    configurable_options = [],
    options = [],
    handleDecrement,
    handleIncrement,
    qty,
  } = productDetails;
  console.log(sku, "sku")
  console.log(productDetails, "productDetails");

  const parentSku = productItem?.parentSku || sku;
  const selectedVariantsUid = getVariantsUid(
    configurable_options,
    selectedConfig,
    options
  );

  const image = media_gallery?.[0]?.url;
  const finalPrice = price_range?.minimum_price?.final_price?.value;
  const regularPrice = price_range?.minimum_price?.regular_price?.value;
  const currency = price_range?.minimum_price?.final_price?.currency;
  const discount = price_range?.minimum_price?.discount?.amount_off;
  let widgets = [];
  try {
    widgets = JSON.parse(custom_product_widgets?.content || "[]");
  } catch (e) {
    console.error("Failed to parse widgets", e);
    
  }
  return (
    <div className="mt-48 ml-36">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="text-sm mb-6 text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.name}
              {index < breadcrumbs.length - 1 && ""}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-[700px] h-[700px] object-cover"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl mb-4">{name}</h1>

          <div className="flex items-center gap-4 text-lg mb-4">
            <span className="text-green-600 font-medium">{stock_status}</span>
            <span className="text-gray-400 text-md">Item No: {sku}</span>
          </div>

          <div className="text-2xl mb-6">
            <span className="font-semibold">
              {finalPrice} {currency}
            </span>
            {discount > 0 && (
              <span className="text-gray-500 line-through ml-3">
                {regularPrice} {currency}
              </span>
            )}
          </div>

          <hr className="border border-gray-300 mb-6" />

          <h2 className="text-xl mb-2 text-black">Quantity</h2>

          {/* 
  <ProductCounter
    combinationNotFound={combinationNotFound}
    handleDecrement={handleDecrement}
    handleIncrement={handleIncrement}
    qty={qty}
  /> 
  */}

          <DetailButtons
            id={productItem?.id}
            name={name}
            sku={sku}
            selectedVariantsUid={selectedVariantsUid}
            combinationNotFound={combinationNotFound}
          />

          {/* ✅ Payment details first */}
          <PaymentDetails />

          {/* ✅ Then expected delivery */}
          <ExpectedDelivery />

          <AvailableStores
            sku={sku}
            combinationNotFound={combinationNotFound}
          />
        </div>
      </div>

      {widgets.length > 0 && (
        <div className="mt-16">
          {widgets.map((widget) => (
            <div
              key={widget.block_id}
              className="mb-10 p-6 border rounded shadow-sm"
            >
              {widget.images && (
                <img
                  src={widget.images}
                  alt={widget.alt}
                  className="w-full max-w-3xl mb-4 rounded"
                />
              )}
              <h3 className="text-2xl font-bold">{widget.title}</h3>
              <p className="mb-4 text-gray-700">{widget.description}</p>
              <div className="flex flex-wrap gap-4">
                {widget.link_label && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {widget.link_label}
                  </button>
                )}
                {widget.link_label_2 && (
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {widget.link_label_2}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFullDetails;
