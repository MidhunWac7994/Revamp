import { useFieldState } from "informed";
import { gql, useQuery } from "@apollo/client";

const GET_CITY = gql`
  query GetCity($code: String!) {
    getAreas(code: $code) {
      items {
        id
        name
      }
    }
  }
`;

const useCityList = () => {
  const { value } = useFieldState("area");
  const code = value?.split("_")?.[2] || "";

  const { data, loading, error } = useQuery(GET_CITY, {
    variables: { code },
    skip: !code,
  });

  const cities =
    data?.getAreas?.items?.map((city) => ({
      label: city?.name,
      value: city?.name,
    })) || [];

  return { cities, loading, error };
};

export default useCityList;
