import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { COUNTRY_CODE } from "../Constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NEW_ADDRESS = gql`
  mutation CreateCustomerAddress(
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
    createCustomerAddress(
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
      city
      __typename
    }
  }
`;

const useAddAddress = ({ toggle, mutateCustomerAddress }) => {
  const formApiRef = useRef();
  const navigate = useNavigate();

  const [createAddress, { loading: isMutating }] = useMutation(NEW_ADDRESS, {
    onCompleted: () => {
      toggle();
      mutateCustomerAddress?.();
      toast.success("Address added successfully");
      formApiRef?.current?.reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "Failed to add address", {
        id: "address-error",
      });

      if (err?.message?.includes("isn't authorized")) {
        navigate("/");
      }
    },
  });

  const handleNewAddress = async ({ values }, callback) => {
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
      const { data } = await createAddress({
        variables: {
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
          region_id: parseInt(region_id),
          lat: lat?.toString(),
          lng: lng?.toString(),
        },
      });

      if (callback && data?.createCustomerAddress?.id) {
        callback(data.createCustomerAddress.id);
      }
    } catch (err) {
      // Error handled in `onError`
    }
  };

  return { handleNewAddress, isMutating, formApiRef };
};

export default useAddAddress;
