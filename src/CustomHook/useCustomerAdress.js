import { useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import useSetShippingAddress from "./useSetShippingAdress"
import useSetBillingAddress from "./useSetBillingAdress";
import { useGlobalData } from "./useGlobalData";

const useCustomerAddress = () => {
  const location = useLocation();
  const { isSignedIn } = useGlobalData();
  const { updateShippingAddress } = useSetShippingAddress({});
  const { updateBillingAddress } = useSetBillingAddress({});
  const [hasCustomerAddress, setHasCustomerAddress] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const { data, loading, error, refetch } = useQuery(FETCH_ADDRESS, {
    skip: !isSignedIn,
  });

  useEffect(() => {
    if (data?.customer?.addresses) {
      const addressData = data.customer.addresses;
      setHasCustomerAddress(addressData.length > 0);

      const defaultAddr = addressData.find(
        (ele) => ele?.default_shipping && ele?.default_billing
      );
      setDefaultAddress(defaultAddr);

      if (location.pathname === "/checkout") {
        const hasAnyDefaultAddress = addressData.some(
          (ele) => ele?.default_billing && ele?.default_shipping
        );
        const isSelectedShippingNotDefault = addressData.some(
          (ele) => ele?.selected_address_shipping && !ele?.default_shipping
        );

        const defaultAddress = addressData.find(
          (ele) => ele?.default_shipping && ele?.default_billing
        );

        if (
          !hasAnyDefaultAddress &&
          !isSelectedShippingNotDefault &&
          addressData[0]?.id
        ) {
          updateShippingAddress(addressData[0]?.id);
          updateBillingAddress(addressData[0]?.id);
        } else if (hasAnyDefaultAddress && !isSelectedShippingNotDefault) {
          updateShippingAddress(defaultAddress?.id);
          updateBillingAddress(defaultAddress?.id);
        }
      }
    }
  }, [data, location.pathname, updateShippingAddress, updateBillingAddress]);

  return {
    addressData: data?.customer?.addresses,
    customerAddressLoading: loading,
    hasCustomerAddress,
    mutateCustomerAddress: refetch,
    defaultAddress,
    error,
  };
};

export default useCustomerAddress;

const FETCH_ADDRESS = gql`
  query GetCustomerAddressList {
    customer {
      addresses {
        id
        city
        default_billing
        default_shipping
        firstname
        lastname
        street
        telephone
        latitude
        longitude
        type_of_address
        selected_address_shipping
        selected_address
        region {
          region
          region_code
          region_id
        }
      }
    }
  }
`;
