import { useState } from "react";

const useProductDetail = ({ productDetails }) => {
  const isConfigurableProduct =
    productDetails?.__typename === "ConfigurableProduct";

  const variants = productDetails?.variants || [];
  const configurableOptions = productDetails?.configurable_options || [];

  const [selectedConfig, setSelectedConfig] = useState({});
  const combinationNotFound = isConfigurableProduct
    ? !hasAllAttributes(configurableOptions, selectedConfig)
    : false;

  const handleSelectConfig = (attribute_code, value_index) => {
    if (!attribute_code && !value_index) {
      setSelectedConfig({});
    } else {
      let newSelection = {
        ...selectedConfig,
        [attribute_code]: value_index,
      };

      if (!isValidVariant(variants, newSelection)) {
        const closestVariant = findClosestVariant(
          variants,
          newSelection,
          selectedConfig
        );
        if (closestVariant) {
          newSelection = closestVariant;
        }
      }

      setSelectedConfig(newSelection);
    }
  };

  let productItem = {};
  if (isConfigurableProduct) {
    productItem = {
      ...productDetails,
      ...returnProductFromVariant(variants, selectedConfig),
    };
  } else {
    productItem = {
      ...productDetails,
    };
  }

  return {
    selectedConfig,
    handleSelectConfig,
    productItem,
    isConfigurableProduct,
    combinationNotFound,
  };
};

export default useProductDetail;

const hasAllAttributes = (data, obj) => {
  const requiredAttributes = data?.map((item) => item?.attribute_code);
  const objKeys = Object.keys(obj);

  return requiredAttributes?.every((attr) => objKeys?.includes(attr));
};

const isValidVariant = (variants, selection) =>
  variants?.some(({ attributes }) =>
    Object.entries(selection)?.every(([code, value]) =>
      attributes?.some(
        (attr) => attr?.code === code && attr?.value_index === value
      )
    )
  );

// Function to find the closest matching variant
const findClosestVariant = (variants, newSelection, selectedConfig) => {
  let matchedConfig = {};

  for (const { attributes } of variants) {
    let tempConfig = { ...newSelection };
    for (const attr of attributes) {
      tempConfig[attr.code] = attr.value_index;
    }
    if (
      isValidVariant(variants, tempConfig) &&
      JSON.stringify(tempConfig) !== JSON.stringify(selectedConfig)
    ) {
      return tempConfig;
    }
    matchedConfig = tempConfig;
  }

  return matchedConfig;
};

const returnProductFromVariant = (variants, selectedConfig) => {
  let i,
    variantProduct = {};
  const configArray = Object.values(selectedConfig);

  if (configArray.length <= 0) {
    return {};
  }

  for (i = 0; i < variants?.length; i++) {
    const attributes_array = variants[i]?.attributes?.map(
      (att) => att?.value_index
    );

    if (arraysHaveSameElements(configArray, attributes_array)) {
      variantProduct = {
        ...variants[i]?.product,
      };
      break;
    }
  }

  return variantProduct;
};

const arraysHaveSameElements = (arr1, arr2) => {
  if (arr1?.length !== arr2?.length) return false;

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
};
