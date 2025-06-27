import { useQuery, gql } from "@apollo/client";
import { COUNTRY_CODE } from "../Constants";

const GET_AVAILABLE_REGIONS = gql`
  query GetAvailableRegions($id: String!) {
    country(id: $id) {
      available_regions {
        id
        code
        name
      }
    }
  }
`;

const useRegionList = () => {
  const { data, loading, error } = useQuery(GET_AVAILABLE_REGIONS, {
    variables: { id: COUNTRY_CODE },
  });

  const available_regions = data?.country?.available_regions ?? [];
  const regions = available_regions.map((region) => ({
    label: region.name,
    value: `${region.id}_${region.name}_${region.code}`,
  }));

  return {
    regions,
    available_regions,
    loading,
    error,
  };
};

export default useRegionList;
