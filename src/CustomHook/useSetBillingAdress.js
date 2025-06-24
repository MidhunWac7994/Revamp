import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import  useCartConfig  from './useCartConfig';

const useSetBillingAddress = ({
  mutateBillingAddressOnCart,
  mutateShippingMethod,
}) => {
  const { cartId } = useCartConfig();
  const navigate = useNavigate();

  const [setBillingAddress, { loading: billingLoading }] = useMutation(
    SET_BILLING_ADDRESS,
    {
      onError: (err) => {
        toast.error(err?.message, { duration: 7000 });
        console.log(err?.message);
        if (err?.message === `The cart isn't active.`) {
          navigate("/cart");
        }
      },
    }
  );

  const updateBillingAddress = async (addressId) => {
    try {
      await setBillingAddress({
        variables: { cartId, addressId },
      });
      mutateBillingAddressOnCart?.(); 
      mutateShippingMethod?.(); 
    } catch (err) {
      console.error("Error updating billing address:", err);
    }
  };

  return { updateBillingAddress, billingLoading };
};

export default useSetBillingAddress;

const SET_BILLING_ADDRESS = gql`
  mutation SetBillingAddressOnCart($cartId: String!, $addressId: Int) {
    setBillingAddressOnCart(
      input: {
        cart_id: $cartId
        billing_address: { customer_address_id: $addressId }
      }
    ) {
      cart {
        billing_address {
          firstname
          lastname
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

