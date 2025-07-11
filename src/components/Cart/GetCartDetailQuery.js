import { gql } from "@apollo/client";

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      email
      total_quantity
      prices {
        grand_total {
          value
          currency
        }
      }
      applied_coupons {
        code
      }
      items {
        uid
        id
        quantity
        available_stock
        is_stock_available_for_item
        strike_price
        __typename

        # Configurable Item Section
        ... on ConfigurableCartItem {
          configured_variant {
            __typename
            type_id
            sku
            name
            custom_attribute_details(
              attribute_codes: ["color", "product_model", "orientation"]
            ) {
              code
              value
              label
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
              }
            }
            ... on CustomizableProductInterface {
              options {
                option_id
                title
                ... on CustomizableDropDownOption {
                  value {
                    uid
                    title
                  }
                }
              }
            }
          }
          customizable_options {
            label
            id
            is_required
            type
            option_custom_type
            values {
              customizable_option_value_uid
              price {
                type
                units
                value
              }
              label
              value
            }
          }
        }

        # Simple Item Section
        ... on SimpleCartItem {
          customizable_options {
            label
            id
            is_required
            type
            option_custom_type
            values {
              customizable_option_value_uid
              price {
                type
                units
                value
              }
              label
              value
            }
          }
        }

        product {
          __typename
          type_id
          id
          sku
          name
          url_key
          has_customizable
          stock_status
          thumbnail {
            url
          }
          custom_attribute_details(
            attribute_codes: ["color", "product_model", "orientation"]
          ) {
            code
            value
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
            }
          }
          product_short_label {
            label
            content
          }
          ... on CustomizableProductInterface {
            options {
              option_id
              title
              ... on CustomizableDropDownOption {
                value {
                  uid
                  title
                }
              }
            }
          }
        }

        prices {
          custom_row_total_price {
            maximum_price {
              discount {
                amount_off
                percent_off
              }
            }
          }
          row_total {
            value
            currency
          }
        }
      }
    }
  }
`;
export const SAVE_FOR_LATER = gql`
  mutation SaveForLater($cartId: String!, $productsId: [Int]!) {
    saveForLaterMultiple(input: { productIds: $productsId, cartId: $cartId }) {
      id
      name
      sku
      price {
        regularPrice {
          amount {
            value
          }
        }
      }
    }
  }
`;

export const GET_SAVE_FOR_LATER_PRODUCTS = gql`
  query GetSavedProducts($cartId: String!) {
  savedProducts(cart_id: $cartId) {
    id
    name
    sku
    url_key
    stock_status
    product_delivery_type
    __typename
    thumbnail {
      url
      label
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

    # ✅ Inline fragment for configurable products
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
export const GET_CART_RECOMMENDED_PRODUCTS = gql`
  query GetCartRecommendedProducts($cartId: String!) {
    cartRelatedProducts(cart_id: $cartId) {
      items {
        id
        name
        sku
        url_key
        stock_status
        __typename
        meta_title
        meta_keyword
        meta_description
        color
        image {
          url
          label
        }
        small_image {
          url
          label
        }
        thumbnail {
          url
          label
        }
        swatch_image
        media_gallery {
          url
          label
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
        # ✅ Inline fragment for configurable products
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

export const REMOVE_SAVED_PRODUCTS = gql`
  mutation RemoveSavedProducts($cartId: String!, $productsId: [Int]!) {
    removeSaveForLaterMultiple(
      input: { productIds: $productsId, cartId: $cartId }
    ) {
      id
      name
      sku
      price {
        regularPrice {
          amount {
            value
          }
        }
      }
    }
  }
`;
