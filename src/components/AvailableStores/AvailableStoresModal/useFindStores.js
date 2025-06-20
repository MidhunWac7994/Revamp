import { useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { toast } from "sonner";
import { MAP_DEFAULT_COORDINATES } from '../../Constants'


const GET_PICKUP_LOCATIONS = gql`
  query GetPickupLocations($sku: String!) {
    pickupLocations(productsInfo: [{ sku: $sku }]) {
      items {
        pickup_location_code
        open_time
        close_time
        name
        latitude
        longitude
        street
      }
    }
  }
`;

const useFindStore = ({ sku }) => {
  const mapRef = useRef(null);

  const onGoogleApiLoaded = ({ map }) => {
    mapRef.current = map;
  };

  const { data, loading, error } = useQuery(GET_PICKUP_LOCATIONS, {
    variables: { sku },
    skip: !sku,
    onCompleted: (data) => {
      const stores = data?.pickupLocations?.items?.[0];
      if (mapRef.current && stores) {
        mapRef.current.setCenter({
          lat: stores.latitude || MAP_DEFAULT_COORDINATES.lat,
          lng: stores.longitude || MAP_DEFAULT_COORDINATES.lng,
        });
      }
    },
  });

  const errorlocation = (error) => {
    if (error.code === 1) {
      toast.error("Please enable location on browser", {
        id: "error fetching live location",
      });
    }
  };

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: latitude, lng: longitude });
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator?.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator?.geolocation?.getCurrentPosition(success, errorlocation);
    }
  };

  const stores = data?.pickupLocations?.items || [];

  return {
    stores,
    isLoading: loading,
    error,
    onGoogleApiLoaded,
    handleCurrentLocation,
  };
};

export default useFindStore;
