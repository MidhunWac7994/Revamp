import { useMutation, gql } from "@apollo/client";

const CREATE_EMPTY_CART = gql`
  mutation CreateCart {
    cartId: createEmptyCart
  }
`;

const MERGE_CARTS = gql`
  mutation MergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(
      source_cart_id: $sourceCartId
      destination_cart_id: $destinationCartId
    ) {
      id
      items {
        id
        prices {
          price {
            value
          }
        }
      }
    }
  }
`;

const useNewCart = () => {
  const [createCartMutation, { loading: creatingCart }] =
    useMutation(CREATE_EMPTY_CART);
  const [mergeCartMutation, { loading: mergingCart }] =
    useMutation(MERGE_CARTS);

  const createCart = async () => {
    try {
      const { data } = await createCartMutation();
      return { cartId: data?.cartId };
    } catch (error) {
      console.error("Create cart error:", error);
      return {};
    }
  };

  const mergeCart = async ({ sourceCartId, destinationCartId }) => {
    try {
      const { data } = await mergeCartMutation({
        variables: {
          sourceCartId,
          destinationCartId,
        },
      });
      return { mergeCarts: data?.mergeCarts };
    } catch (error) {
      console.error("Merge cart error:", error);
      return {};
    }
  };

  return {
    createCart,
    creatingCart,
    mergeCart,
    mergingCart,
  };
};

export default useNewCart;
