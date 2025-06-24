import { gql, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import useCartConfig from "./useCartConfig";


const useSetShippingAddress = (props) => {
  const { mutateShippingMethod, mutateShippingAddressOnCart } = props;
  const { cartId } = useCartConfig();
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const [setShippingAddress, { loading: shippingLoading }] = useMutation(
    SET_SHIPPING_ADDRESS,
    {
      onCompleted: (data) => {
        if (location.pathname === "/checkout") {
          mutateShippingMethod?.();
          mutateShippingAddressOnCart?.();
        }
      },
      onError: (err) => {
        toast.error(err?.message, { duration: 7000 });
        console.log(err?.message);
        if (err?.message === `The cart isn't active.`) {
          navigate("/cart"); 
        }
      },
    }
  );

  const updateShippingAddress = async (addressId) => {
    try {
      await setShippingAddress({
        variables: {
          cartId,
          addressId,
        },
      });
    } catch (err) {
      console.log("Error updating shipping address:", err);
    }
  };

  return { updateShippingAddress, shippingLoading };
};

export default useSetShippingAddress;


const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddressesOnCart($cartId: String!, $addressId: Int) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cartId
        shipping_addresses: [{ customer_address_id: $addressId }]
      }
    ) {
      cart {
        id
        shipping_addresses {
          customer_address_id
          firstname
          lastname
          type_of_address
          type_of_address
          street
          city
          region {
            code
            label
            __typename
          }
          telephone
          country {
            code
            label
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
