import { useQuery, gql } from "@apollo/client";
import ComponentReturner from "../../components/ComponentReturner";

const HOME_PAGE_QUERY = gql`
  query GetHomePage {
    homepageCms {
      id
      content
      title
      meta_description
      meta_keywords
      meta_title
      og_image
    }
  }
`;

const Home = () => {
  const { data } = useQuery(HOME_PAGE_QUERY);

  const parsedHomePageData = data?.homepageCms?.content
    ? JSON.parse(data?.homepageCms?.content)
    : [];
    console.log(parsedHomePageData)
  return (
    <div>
      {parsedHomePageData.map((homeData) => (
        <ComponentReturner key={homeData.block_id} homeData={homeData} />
      ))}
    </div>
  );
};

export default Home;
