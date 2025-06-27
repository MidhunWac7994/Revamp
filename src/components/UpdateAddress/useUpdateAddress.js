import { useRef } from "react";
import { toast } from "sonner";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { COUNTRY_CODE } from "../Constants";

const UPDATE_ADDRESS = gql`
  mutation UpdateCustomerAddress(
    $id: Int!
    $firstname: String
    $lastname: String
    $city: String
    $street: [String]
    $telephone: String
    $country_code: String
    $type_of_address: String
    $default_billing: Boolean
    $default_shipping: Boolean
    $region: String
    $region_code: String
    $region_id: Int
    $lat: String!
    $lng: String!
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        firstname: $firstname
        lastname: $lastname
        city: $city
        street: $street
        telephone: $telephone
        country_code: $country_code
        type_of_address: $type_of_address
        default_billing: $default_billing
        default_shipping: $default_shipping
        latitude: $lat
        longitude: $lng
        region: {
          region: $region
          region_code: $region_code
          region_id: $region_id
        }
      }
    ) {
      id
      firstname
      default_billing
      default_shipping
      city
      __typename
    }
  }
`;

const useUpdateAddress = (
  toggle,
  id,
  mutateCustomerAddress,
  setDefaultAddress
) => {
  const formApiRef = useRef();
  const navigate = useNavigate();

  const [updateAddressMutation, { loading: isMutating }] = useMutation(
    UPDATE_ADDRESS,
    {
      onCompleted: (data) => {
        const { default_billing, default_shipping, id } =
          data?.updateCustomerAddress || {};

        if (default_billing && default_shipping) {
          setDefaultAddress(id);
        }

        toggle();
        mutateCustomerAddress?.();
        toast.success("Address updated.");
        formApiRef?.current?.reset();
      },
      onError: (err) => {
        console.error(err);
        toast.error(err?.message || "Failed to update address.");
        if (
          err?.message &&
          err.message === "The current customer isn't authorized."
        ) {
          navigate("/");
        }
      },
    }
  );

  const handleUpdateAddress = async ({ values }, callback) => {
    const { address_form, lat, lng } = values;
    const {
      firstname,
      lastname,
      telephone,
      area,
      type_of_address,
      city,
      street,
      default_address,
      landmark,
    } = address_form || {};

    const [region_id, region, region_code] = area?.split("_") || [];

    try {
      const { data } = await updateAddressMutation({
        variables: {
          id: Number(id),
          firstname,
          lastname,
          city,
          street: [street, landmark || ""],
          country_code: COUNTRY_CODE,
          telephone,
          type_of_address,
          default_billing: default_address,
          default_shipping: default_address,
          region,
          region_code,
          region_id: Number(region_id),
          lat: lat?.toString(),
          lng: lng?.toString(),
        },
      });

      if (callback) {
        const updatedId = data?.updateCustomerAddress?.id;
        callback(updatedId);
      }
    } catch (err) {
      // Error already handled by `onError`
    }
  };

  return { handleUpdateAddress, isMutating, formApiRef };
};

export default useUpdateAddress;
