export const getVariantsUid = (
  configurable_options,
  selectedConfig,
  options
) => {
  return [
    ...(configurable_options?.flatMap((option) =>
      selectedConfig?.[option?.attribute_code]
        ? option?.values
            ?.filter(
              (item) =>
                item?.value_index === selectedConfig?.[option?.attribute_code]
            )
            ?.map((item) => item?.uid)
        : []
    ) || []),
    ...(options
      ?.filter((opt) => opt?.required)
      ?.map((opt) => opt?.value?.[0]?.uid) || []),
  ];
};
