import { gql, useQuery } from "@apollo/client";
import useCartConfig from "./useCartConfig";


const useCartShippingAddress = () => {
  const { cartId } = useCartConfig();

  const {
    data: shippingData,
    loading: shippingLoading,
    refetch: refetchShippingAddress,
    networkStatus: shippingNetworkStatus,
  } = useQuery(GET_SHIPPING_ADDRESS_ON_CART, {
    variables: { cart_id: cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: billingData,
    loading: billingLoading,
    refetch: refetchBillingAddress,
    networkStatus: billingNetworkStatus,
  } = useQuery(GET_BILLING_ADDRESS_ON_CART, {
    variables: { cart_id: cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const shippingAddress = shippingData?.cart?.shipping_addresses;
  const shippingAddressIdOnCart = shippingAddress?.[0]?.customer_address_id;

  const billingAddressOnCart = billingData?.cart?.billing_address;
  const billingAddressIdOnCart = billingAddressOnCart?.customer_address_id;

  const shippingSameAsBilling =
    billingAddressIdOnCart === shippingAddressIdOnCart ? "same" : "different";

  const hasShippingAddressOnCart = shippingAddress?.length > 0;

  return {
    shippingAddress,
    shippingAddressIdOnCart,
    billingAddressOnCart,
    hasShippingAddressOnCart,
    cartShippingAddressLoading: shippingLoading || shippingNetworkStatus === 4, 
    shippingSameAsBilling,
    billingAddressIdOnCart,
    mutateShippingAddressOnCart: refetchShippingAddress,
    mutateBillingAddressOnCart: refetchBillingAddress,
    billingAddressLoading: billingLoading || billingNetworkStatus === 4,
  };
};

export default useCartShippingAddress;


const GET_SHIPPING_ADDRESS_ON_CART = gql`
  query GetShippingAddressOnCart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      shipping_addresses {
        customer_address_id
        firstname
        lastname
        street
        city
        latitude
        longitude
        type_of_address
        region {
          code
          label
        }
        country {
          code
          label
        }
        telephone
        other_instructions
      }
    }
  }
`;

const GET_BILLING_ADDRESS_ON_CART = gql `
  query GetBillingAddressOnCart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      billing_address {
        customer_address_id
        firstname
        lastname
        street
        city
        new_address_city
        region_name
        region {
          code
          label
          region_id
        }
        country {
          code
          label
        }
        telephone
        latitude
        longitude
        type_of_address
      }
    }
  }
`;
