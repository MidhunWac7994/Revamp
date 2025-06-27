import { useQuery, gql } from "@apollo/client";
import useCartConfig from "../../../../CustomHook/useCartConfig";
import { useGlobalData } from "../../../../CustomHook/useGlobalData";

const GET_STORE_PICKUP_DATA = gql`
  query GetStorePickupData($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      instore_additional_data {
        email
        phone_number
        full_name
        pickup_location_code
        name
        open_time
        close_time
        street
      }
    }
  }
`;

const useStorePickup = () => {
  const { cartId } = useCartConfig();
  const { isSignedIn, fullName, email, phoneNumber } = useGlobalData();

  const {
    data,
    loading: storePickupLoading,
    refetch,
  } = useQuery(GET_STORE_PICKUP_DATA, {
    variables: { cartId },
    skip: !cartId,
    fetchPolicy: "cache-and-network",
  });

  const storePickupData = data?.cart?.instore_additional_data;

  const selectedStore = {
    name: storePickupData?.name,
    open_time: storePickupData?.open_time,
    pickup_location_code: storePickupData?.pickup_location_code,
    close_time: storePickupData?.close_time,
    street: storePickupData?.street,
  };

  const initialValues = {
    fullName: storePickupData?.full_name,
    email: storePickupData?.email,
    phone: storePickupData?.phone_number,
  };

  const existingUserValues = isSignedIn
    ? {
        fullName,
        email,
        phone: phoneNumber,
      }
    : {};

  return {
    storePickupData,
    storePickupLoading,
    mutateStorePickup: refetch,
    selectedStore,
    initialValues,
    existingUserValues,
  };
};

export default useStorePickup;
