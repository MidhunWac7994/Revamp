import { useQuery, gql } from "@apollo/client";
import useCartConfig from "./useCartConfig";

const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      total_quantity
      items {
        uid
        id
        quantity
        is_stock_available_for_item
        strike_price
        __typename

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
            values {
              customizable_option_value_uid
              price {
                value
              }
            }
          }
        }

        ... on SimpleCartItem {
          customizable_options {
            label
            id
            is_required
            values {
              price {
                value
              }
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
          color
          product_model
          orientation
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
          }
        }
      }
    }
  }
`;

const useCartItemsSummary = () => {
  const { cartId, fetchCartId } = useCartConfig();

  const { data, loading, error, refetch } = useQuery(GET_CART_DETAILS, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error(error.message);
      if (
        error?.message === `The cart isn't active.` ||
        error?.message.includes(
          "The current user cannot perform operations on cart"
        )
      ) {
        fetchCartId(); // Re-fetch cart ID on error
      }
    },
  });

  const cartItems = data?.cart?.items || [];
  console.log(cartItems);

  const totalQuantity = data?.cart?.total_quantity || 0;

  const isInStock =
    cartItems.length > 0 &&
    cartItems.every((item) => item?.is_stock_available_for_item);

  // console.log("useCartItemsSummary result:", {
  //   totalQuantity,
  //   cartItems,
  //   loading,
  //   error,
  // });
  return {
    data,
    totalQuantity,
    cartItems,
    loading,
    error,
    isInStock,
    mutateCartItems: refetch, 
  };
};

export default useCartItemsSummary;
