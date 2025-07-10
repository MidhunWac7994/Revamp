
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_POPULAR_SEARCH = gql`
  query GetPopularSearch {
    getSearchStrings
  }
`;

const PopularSearch = () => {
  const { data, loading, error } = useQuery(GET_POPULAR_SEARCH);

  if (loading) return null; 
  if (error) return null; 

  return (
    data?.getSearchStrings?.length > 0 && (
      <div data-widget="PopularSearch" className="mb-6">
        <h2 className="text-14 font-medium text-black leading-6 tracking-wider">
          Popular Search
        </h2>
        <div className="mt-5 flex gap-3 flex-wrap">
          {data?.getSearchStrings?.map((item) => (
            <Link
              to={item}
              key={item}
              className="py-3 px-[19px] border border-[#D6D6D6] text-[#454545] text-14 leading-4"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default PopularSearch;
        