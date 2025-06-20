import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($url_key: String!) {
    products(filter: { url_key: { eq: $url_key } }) {
      items {
        __typename
        id
        ... on CustomizableProductInterface {
          options {
            title
            required
            option_id
            content_title
            content
            price_text
            tool_tip
            logo

            ... on CustomizableDropDownOption {
              value {
                price
                uid
              }
            }
          }
        }
        name
        sku
        custom_attribute_details(
          attribute_codes: ["color", "product_model", "orientation"]
        ) {
          code
          value
          label
        }
        url_key
        meta_description
        pdp_breadcrumbs {
          category_name
          category_url_path
        }

        custom_product_widgets {
          id
          content
        }

        stock_status
        product_custom_attributes
        __typename
        media_gallery {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        product_crossSell_flag
        crosssell_products {
          id
          name
          url_key
          sku
          stock_status
          thumbnail {
            url
            label
          }
          price_range {
            minimum_price {
              discount {
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }

              regular_price {
                currency
                value
              }
            }
          }
        }
        upsell_products {
          id
          name
          sku
          stock_status
          thumbnail {
            url
            label
          }
          price_range {
            minimum_price {
              discount {
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }

              regular_price {
                currency
                value
              }
            }
          }
        }

        ... on ConfigurableProduct {
          configurable_options {
            id
            label
            attribute_code
            values {
              uid
              non_existent_attributes
              value_index
              label
              swatch_data {
                ... on ImageSwatchData {
                  thumbnail
                }
                value
              }
            }
            product_id
          }
          variants {
            attributes {
              label
              code
              value_index
            }
            product {
              id
              name
              sku
              custom_attribute_details(
                attribute_codes: ["color", "product_model", "orientation"]
              ) {
                code
                value
                label
              }
              url_key
              color
              product_model
              orientation
              price_range {
                minimum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }

                  regular_price {
                    currency
                    value
                  }
                }
                maximum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price {
                    value
                    currency
                  }
                  discount {
                    amount_off
                    percent_off
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PDP_BREADCRUMB = gql`
  query GetPdpBreadcrumb($url_key: String!) {
    products(filter: { url_key: { eq: $url_key } }) {
      items {
        pdp_breadcrumbs {
          category_name
          category_url_path
        }
      }
    }
  }
`;

export const ADD_TO_RECENTLY_VIEWED = /* GraphQL */ `
  mutation AddtoRecentlyviewed($cartId: String!, $productId: Int!) {
    addtoRecentlyviewed(cartid: $cartId, productid: $productId)
  }
`;

export const GET_RECENTLY_VIEWED = /* GraphQL */ `
  query GetRecentlyViewedProducts($cartId: String!, $current_product_id: Int) {
    getRecentlyviewedProducts(
      cartid: $cartId
      current_product_id: $current_product_id
    ) {
      __typename
      id
      name
      thumbnail {
        url
        __typename
      }
      sku
      url_key
      product_delivery_type
      stock_status
      price_range {
        minimum_price {
          regular_price {
            value
            currency
            __typename
          }
          final_price {
            value
            currency
            __typename
          }
          discount {
            amount_off
            percent_off
            __typename
          }
          __typename
        }
        maximum_price {
          regular_price {
            value
            currency
            __typename
          }
          final_price {
            value
            currency
            __typename
          }
          discount {
            amount_off
            percent_off
            __typename
          }
          __typename
        }
        __typename
      }
      # Inline fragment for configurable products
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
`;
