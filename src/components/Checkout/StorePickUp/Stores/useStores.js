import { useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { MAP_DEFAULT_COORDINATES } from "../../../Constants";
import useCartConfig from "../../../../CustomHook/useCartConfig";
import { toast } from "sonner";

const useStores = ({ isOpen, toggle, mutateStorePickup }) => {
  const mapRef = useRef(null);
  const formApiRef = useRef(null);
  const { cartId } = useCartConfig();

  const { data, loading: isLoading } = useQuery(GET_PICKUP_LOCATIONS, {
    variables: { cartId },
    skip: !isOpen,
    onCompleted: (data) => {
      const stores = data?.pickupLocations?.items?.[0];
      if (mapRef.current && stores) {
        mapRef.current.setCenter({
          lat: stores?.latitude || MAP_DEFAULT_COORDINATES.lat,
          lng: stores?.longitude || MAP_DEFAULT_COORDINATES.lng,
        });
      }
    },
    onError: (error) => {
      console.error("Error fetching stores:", error.message);
      toast.error("Failed to fetch store locations.");
    },
  });

  const [setStorePickup, { loading: isMutating }] = useMutation(SET_STORE, {
    onError: (err) => {
      console.error(err.message);
      toast.error(err.message || "Error setting store pickup.", {
        id: "set store pickup error",
      });
    },
  });

  const onGoogleApiLoaded = ({ map }) => {
    mapRef.current = map;
  };

  const handleCurrentLocation = () => {
    if (!navigator?.geolocation) {
      toast.error("Geolocation not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current?.setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          toast.error("Please enable location on your browser.", {
            id: "error fetching live location",
          });
        }
      );
    }
  };

  const handleSelectStore = async (store) => {
    formApiRef.current?.setValue("storeCode", store);
  };

  const handleSubmit = async ({ values }) => {
    await setStorePickup({
      variables: {
        cartId,
        storeCode: values?.storeCode?.pickup_location_code,
        phone_number: values?.pickup_form?.phone,
        email: values?.pickup_form?.email,
        full_name: values?.pickup_form?.fullName,
      },
    });

    toggle?.();
    mutateStorePickup?.();
  };

  return {
    stores: data?.pickupLocations?.items || [],
    isLoading,
    onGoogleApiLoaded,
    handleCurrentLocation,
    handleSelectStore,
    isMutating,
    formApiRef,
    handleSubmit,
  };
};

export default useStores;

const GET_PICKUP_LOCATIONS = gql`
  query GetPickupLocations($cartId: String!) {
    pickupLocations(cart_id: $cartId) {
      items {
        pickup_location_code
        name
        open_time
        close_time
        latitude
        longitude
        street
      }
    }
  }
`;

const SET_STORE = gql `
  mutation SetPickupLocationOnCart(
    $cartId: String!
    $storeCode: String!
    $phone_number: String!
    $email: String!
    $full_name: String!
  ) {
    setPickupLocationCode(
      cart_id: $cartId
      pickup_location_code: $storeCode
      phone_number: $phone_number
      email: $email
      full_name: $full_name
    )
  }
`;
