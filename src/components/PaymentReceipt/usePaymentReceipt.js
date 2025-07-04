"use client";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import useCartConfig from "../../CustomHook/useCartConfig";
import { CARTID_KEY, GUEST_USER_KEY } from "../Constants";
import { useGlobalData } from "../../CustomHook/useGlobalData";
import useCartClear from "../../CustomHook/useCartClear";
import { getLocalStorageWithExpiry } from "../../utils/storageUtil";
import { isObjectEmpty } from "../../utils/objectUtil";

const usePaymentReceipt = ({ orderId, orderStatus }) => {
  const { setCartId, cartId } = useCartConfig();
  const { isSignedIn, userDetailsDataLayer } = useGlobalData();
  const { handleClearCart } = useCartClear();

  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { mobile, mobileOnAddress } = guestData || {};
  const newCartId =
    typeof window !== "undefined" ? localStorage.getItem(CARTID_KEY) : null;

  useEffect(() => {
    if (newCartId && newCartId !== cartId) {
      // setCartId(newCartId); 
      if (orderId && orderStatus === 1) handleClearCart(newCartId);
    }
  }, [newCartId, cartId, orderId, orderStatus, setCartId, handleClearCart]);

  const {
    data: purchaseDetails,
    loading: purchaseDetailsLoading,
    error: purchaseDetailsError,
  } = useQuery(GET_ORDER_DETAILS, {
    variables: { orderId },
    skip: orderStatus !== 1 || !isSignedIn,
    fetchPolicy: "network-only",
  });

  const {
    data: guestOrderDetails,
    loading: guestOrderLoading,
    error: guestOrderError,
  } = useQuery(GET_GUEST_ORDER_DETAILS, {
    variables: {
      orderId,
      phoneNo: mobileOnAddress || mobile || "",
    },
    skip: orderStatus !== 1 || isSignedIn,
    fetchPolicy: "network-only",
  });

  const customerOrderDetails = isSignedIn
    ? purchaseDetails?.customer?.orders?.items || []
    : guestOrderDetails?.guestOrderDetails?.items || [];

  const firstOrder = customerOrderDetails[0] || {};
  const orderList = firstOrder.items || [];
  const customerEmail = firstOrder.customer_email || "";
  const customerPhone = firstOrder.customer_phone || "";
  const shippingAddress = firstOrder.shipping_address || {};
  const billingAddress = isSignedIn
    ? firstOrder.billing_address || {}
    : firstOrder.shipping_address || {};

  const customPrices = firstOrder.custom_prices || [];
  const total = firstOrder.total || {};
  const customerinvoice = customerEmail || customerPhone;
  const estimatedDelivery = firstOrder.expected_delivery || "";
  const isStorePickup = firstOrder.shipping_method_code === "instore";
  const storePickupAddress = firstOrder.instore_additional_data || {};

  const billing_address = {
    ...billingAddress,
    ...(customerEmail &&
      !isObjectEmpty(billingAddress) && { email: customerEmail }),
  };

  const shipping_address = !isStorePickup && {
    ...shippingAddress,
    ...(customerEmail &&
      !isObjectEmpty(shippingAddress) && { email: customerEmail }),
    ...(firstOrder.estimated_delivery &&
      !isObjectEmpty(shippingAddress) && {
        estimated: firstOrder.estimated_delivery,
      }),
  };

  return {
    customerOrderDetails, // Ensured no 'cus' typo
    customerinvoice,
    isSignedIn,
    loading: purchaseDetailsLoading || guestOrderLoading,
    error: purchaseDetailsError || guestOrderError,
    orderList,
    shipping_address,
    billing_address,
    customPrices,
    total,
    estimatedDelivery,
    storePickupAddress,
    isStorePickup,
  };
};

export default usePaymentReceipt;

// GraphQL queries (unchanged, included for reference)
export const GET_ORDER_DETAILS = gql`
  query GetPaymentReceiptDetails($orderId: String!) {
    customer {
      orders(filter: { increment_id: { eq: $orderId } }) {
        items {
          id
          estimated_delivery
          shipping_method_code
          instore_additional_data {
            phone_number
            full_name
            name
            street
          }
          custom_prices {
            id
            label
            value
          }
          total {
            grand_total {
              value
            }
          }
          items {
            product_image
            id
            product_name
            is_item_can_cancel
            product_sku
            quantity_ordered
            product {
              categories {
                id
                name
              }
            }
            product_sale_price {
              value
            }
          }
          customer_email
          customer_phone
          shipping_address {
            firstname
            lastname
            street
            city
            telephone
            type_of_address
            region
            country_code
          }
          billing_address {
            firstname
            lastname
            street
            city
            telephone
            type_of_address
            region
            country_code
          }
        }
      }
    }
  }
`;

export const GET_GUEST_ORDER_DETAILS = gql`
  query GetGuestOrderDetails($orderId: String!, $phoneNo: String!) {
    guestOrderDetails(order_id: $orderId, phone_no: $phoneNo) {
      items {
        id
        shipping_method_code
        instore_additional_data {
          phone_number
          full_name
          name
          street
        }
        expected_delivery {
          label
          date
        }
        custom_prices {
          id
          label
          value
        }
        items {
          id
          product_name
          quantity_ordered
          product_image
          product_sale_price {
            value
          }
        }
        customer_email
        customer_phone
        shipping_address {
          firstname
          lastname
          street
          city
          telephone
          area
          type_of_address
          region
        }
      }
    }
  }
`;

export const ADD_CAPI_PURCHASE = gql`
  mutation AddCapiPurchase(
    $orderId: String!
    $clientId: String
    $nonPersonalizedAds: String
    $source: String
    $medium: String
    $campaign: String
    $term: String
    $sessionDuration: String
    $sessionId: String
  ) {
    addCapiPurchase(
      order_id: $orderId
      client_id: $clientId
      non_personalized_ads: $nonPersonalizedAds
      source: $source
      medium: $medium
      campaign: $campaign
      term: $term
      session_duration: $sessionDuration
      session_id: $sessionId
    )
  }
`;
