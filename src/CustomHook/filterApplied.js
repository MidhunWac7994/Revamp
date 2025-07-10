export const filterApplied = (searchParams, attributeCodes) => {
  const filters = [];

  for (const [key, value] of searchParams.entries()) {
    if (value && attributeCodes?.includes(key)) {
      if (key === "price") {
        const prices = value?.split(",") || [];
        const min = prices?.[0] || 0;
        const max = prices?.[1] || 0;
        const existingPriceFilter = filters?.find(
          (f) => f?.attribute_code === "price"
        );
        if (!existingPriceFilter) {
          filters.push({ attribute_code: "price", value: [`${min} - ${max}`] });
        }
      } else {
        const decodedValues = value?.split(",")?.map(decodeURIComponent);

        const existingFilter = filters?.find((f) => f?.attribute_code === key);
        if (existingFilter) {
          existingFilter.value = [
            ...new Set([...existingFilter.value, ...decodedValues]),
          ];
        } else {
          filters.push({ attribute_code: key, value: decodedValues });
        }
      }
    }
  }

  return filters;
};
