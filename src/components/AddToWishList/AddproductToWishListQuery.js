export const ADD_PRODUCTS_TO_WISHLIST = /* GraphQL */ `
  mutation AddProductsToWishlist(
    $wishlistId: ID!
    $productsToWishilist: [WishlistItemInput!]!
  ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $productsToWishilist
    ) {
      wishlist {
        id
        items_count
        items_v2(currentPage: 1, pageSize: 8) {
          items {
            id
            quantity
            ... on BundleWishlistItem {
              bundle_options {
                values {
                  id
                  label
                  quantity
                }
              }
            }
            product {
              uid
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    currency
                    value
                  }
                }
                maximum_price {
                  regular_price {
                    currency
                    value
                  }
                }
              }
            }
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;

export const GET_CUSTOMER_WISHLIST = /* GraphQL */ `
  query GetCustomerWishlistItems {
    customer {
      wishlists {
        items {
          id
          product {
            sku
            name
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST_MUTATION = /* GraphQL */ `
  mutation RemoveWishlistProducts($wishlistId: ID!, $wishlistItemsIds: [ID!]!) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      wishlist {
        id
        items_count
        items_v2 {
          items {
            id
            quantity
            product {
              uid
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    currency
                    value
                  }
                }
                maximum_price {
                  regular_price {
                    currency
                    value
                  }
                }
              }
            }
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;
