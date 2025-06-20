export const gtagEvent = ({
  command = "event",
  event = "",
  ecommerce = {},
  items = [],
  user = {},
}) => {
  try {
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
    // window.dataLayer?.push({
    //   event: event,
    //   ecommerce: {
    //     ...ecommerce,
    //     ...(items?.length > 0 ? { items: [...items] } : ""),
    //     ...(user && { user: { ...user } }),
    //   },
    // });
  } catch (e) {
    console.log(e);
  }
};

export const setProductCatgories = (categories) => {
  if (!categories || categories?.length === 0) return {};
  let categoriesObj = {},
    i;

  if (!!categories)
    for (i = 0; i < categories?.length; i++) {
      const category = categories?.[i];
      if (category?.category_name || category?.name) {
        const key = `item_category${i === 0 ? "" : i + 1}`;
        categoriesObj[key] = category?.category_name || category?.name;
      }
    }

  return categoriesObj;
};

export const cartDataForGtm = (cartItems, itemCategory) => {
  if (!cartItems || cartItems?.length === 0) return [];

  let items = [],
    i;

  for (i = 0; i < cartItems?.length; i++) {
    const hasDiscount =
      cartItems[i]?.strike_price &&
      cartItems[i]?.strike_price > cartItems[i]?.prices?.row_total?.value;
    let cartObj = {
      item_id: cartItems[i]?.product?.sku,
      item_name: cartItems[i]?.product?.name,
      price: hasDiscount
        ? cartItems[i]?.strike_price
        : cartItems[i]?.prices?.row_total?.value,
      currency: cartItems[i]?.prices?.row_total?.currency,
      discount: hasDiscount
        ? cartItems[i]?.strike_price - cartItems[i]?.prices?.row_total?.value
        : "",
      item_brand: cartItems[i]?.product?.brandName,
      ...setProductCatgories(itemCategory[i]?.product?.categories),
      quantity: cartItems[i]?.quantity,
    };

    items = [...items, cartObj];
  }
  return items;
};

export const placedOrdersDataForGtm = (cartItems, isGuest) => {
  if (!cartItems || cartItems?.length === 0) return [];

  let items = [],
    i;

  for (i = 0; i < cartItems?.length; i++) {
    const result =
      isGuest &&
      cartItems[i]?.product_category?.split(",")?.map((item) => ({
        name: item?.trim(),
      }));

    const itemCategory = result
      ? result
      : cartItems[i]?.product?.categories?.length > 0 &&
        cartItems[i]?.product?.categories?.filter(
          (category) => category?.name !== "Default Category"
        );

    let cartObj = {
      item_name: cartItems[i]?.product_name || "",
      currency: cartItems[i]?.product_sale_price?.currency || "",
      price: cartItems[i]?.product_sale_price?.value || "",
      quantity: cartItems[i]?.quantity_ordered || "",
      item_id: cartItems[i]?.product_sku || "",
      brand_name: isGuest
        ? cartItems[i]?.brand_name?.brand_name
        : cartItems[i]?.product?.brandName || "",
      ...setProductCatgories(itemCategory),
    };

    items = [...items, cartObj];
  }
  return items;
};

export const customPriceDataForGtm = (customPrice) => {
  if (!customPrice || customPrice?.length === 0) return [];
  let priceDetails = {},
    i;
  if (!!customPrice) {
    for (i = 0; i < customPrice?.length; i++) {
      const customPriceValue = Math.abs(customPrice[i]?.value);
      if (customPrice[i]?.class_name === "price_normal") {
        priceDetails["subtotal"] = customPriceValue;
      } else if (customPrice[i]?.class_name === "shipping") {
        priceDetails["shipping"] = customPriceValue;
      } else if (customPrice[i]?.class_name === "discount") {
        priceDetails["discount"] = customPriceValue;
      } else if (customPrice[i]?.class_name === "tip") {
        priceDetails["tip"] = customPriceValue;
      }
    }
  }
  return priceDetails;
};
