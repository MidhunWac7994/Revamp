import { gql } from "@apollo/client";

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails {
    customer {
      id
      firstname
      lastname
      email
      mobile_number
      wishlists {
        id
      }
    }
  }
`;

export const GET_FILTER_ATTRIBUTES = gql`
  query GetFilterInputsForCategory {
    __type(name: "ProductAttributeFilterInput") {
      inputFields {
        name
      }
    }
  }
`;
