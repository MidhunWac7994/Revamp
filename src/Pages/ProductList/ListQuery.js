import { gql } from "@apollo/client";

// Define the GraphQL query
export const GET_PRODUCT_LISTING = gql`
  query GetProductListing(
    $filter: ProductAttributeFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: ProductAttributeSortInput
    $category_id: Int
  ) {
    products(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      total_count
      aggregations(current_cat_id: $category_id) {
        attribute_code
        label
        options {
          label
          value
        }
      }
      items {
        id
        name
        sku
        uid
        url_key
        stock_status
        hover_image
        __typename
        image {
          url
          label
        }
        wac_catalog_label {
          label_text
          text_color
          background_color
        }
        price_range {
          minimum_price {
            regular_price {
              value
            }
            final_price {
              value
            }
            discount {
              amount_off
              percent_off
            }
          }
          maximum_price {
            regular_price {
              value
            }
            final_price {
              value
            }
          }
        }
        #Inline fragment for configurable products
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_code
            values {
              swatch_data {
                ... on ImageSwatchData {
                  thumbnail
                }
                value
              }
            }
          }
        }
      }
    }
  }
`;
