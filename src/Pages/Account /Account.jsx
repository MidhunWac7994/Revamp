import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import DashboardPage from "../../components/DashBoard/DashBoard";

const Dashboard = () => {
  const { locale } = useParams();

  const { data } = useQuery(GET_FAQ_BY_GROUP, {
    variables: { groupId: 1, locale }, 
  });



  const faqData = data?.faqs?.faqs || [];
  console.log(faqData);
  console.log(data)

  return (
    <section data-widget="Dashboard">
      <DashboardPage faqData={faqData} />
    </section>
  );
};

export default Dashboard;

export const GET_FAQ_BY_GROUP = gql `
  query GetFaqByGroup($groupId: Int) {
    faqs(group_id: $groupId) {
      faqs {
        id
        question
        answer
      }
    }
  }
`;
