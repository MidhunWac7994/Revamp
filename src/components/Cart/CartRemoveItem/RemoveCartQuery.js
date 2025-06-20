import { gql } from "@apollo/client";

export const DELETE_CART_ITEM = gql`
  mutation RemoveMultipleItemsFromCart($cartId: String!, $cartItemsId: [Int]!) {
    removeMultipleItemsFromCart(
      input: { cart_id: $cartId, cart_item_ids: $cartItemsId }
    ) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql `
  mutation updateCartItems(
    $cart_id: String!
    $cart_item_uid: ID!
    $quantity: Float!
  ) {
    updateCartItems(
      input: {
        cart_id: $cart_id
        cart_items: [{ cart_item_uid: $cart_item_uid, quantity: $quantity }]
      }
    ) {
      cart {
        items {
          uid
          product {
            name
            sku
            
          }
          prices {
            row_total {
              value
            }
          }
          is_stock_available_for_item
          quantity
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;

export const ADDON_SERVICE_CART_UPDATE = gql`
  mutation updateCartItems(
    $cart_id: String!
    $cart_item_uid: ID!
    $quantity: Float!
    $value_1: String!
    $value_2: String!
    $option_1: Int!
    $option_2: Int!
  ) {
    updateCartItems(
      input: {
        cart_id: $cart_id
        cart_items: [
          {
            cart_item_uid: $cart_item_uid
            quantity: $quantity
            customizable_options: [
              { id: $option_1, value_string: $value_1 }
              { id: $option_2, value_string: $value_2 }
            ]
          }
        ]
      }
    ) {
      cart {
        items {
          uid
          product {
            name
          }
          quantity
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;
