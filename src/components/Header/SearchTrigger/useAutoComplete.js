import { useDebounce } from "../../../CustomHook/useDebounce"
import { useQuery, gql } from "@apollo/client";

const SUGGESTION_QUERY = gql`
  query GetSuggestions($query: String!) {
    searchSuggestions(query: $query) {
      products
      suggestionSentence
    }
  }
`;

const useAutoComplete = (props) => {
  const { inputValue, hasValue } = props;

  const { debounceVal } = useDebounce({
    val: hasValue ? inputValue : "",
    delay: 300,
  });

  const {
    data,
    error,
    loading: isLoading,
  } = useQuery(SUGGESTION_QUERY, {
    variables: { query: debounceVal },
    skip: !debounceVal,
  });

  const products = data?.searchSuggestions?.products;
  const suggestionsSentance = data?.searchSuggestions?.suggestionSentence;

  const filteredResult =
    products?.length > 4 ? products?.slice(0, 4) : products;

  return {
    isLoading,
    error,
    filteredResult,
    suggestionsSentance,
  };
};

export default useAutoComplete;