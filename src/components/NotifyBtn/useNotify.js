import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";

const useNotify = ({ id, toggle }) => {
  const formApiRef = useRef();

  const [notifyMutation, { loading: isMutating }] = useMutation(
    GET_NOTIFICATION,
    {
      onCompleted: (data) => {
        formApiRef?.current?.reset();
        toggle();
        toast.success("We will notify you via email.");
      },
      onError: (error) => {
        toast.error(error?.message );
      },
    }
  );

  const handleNotify = async ({ values }) => {
    if (!id) {
      toast.error("Product ID is missing");
      return;
    }

    notifyMutation({
      variables: {
        product_id: id,
        email: values?.email,
      },
    });
  };

  return {
    handleNotify,
    formApiRef,
    isMutating,
  };
};

export default useNotify;


export const GET_NOTIFICATION =gql`
  mutation GetNotification($email: String!, $product_id: Int!) {
    getStockNotificationAlertToEmail(email: $email, product_id: $product_id) {
      status
      message
    }
  }
`;
