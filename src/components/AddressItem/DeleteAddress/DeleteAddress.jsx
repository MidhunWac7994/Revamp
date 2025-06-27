import RemoveDialog from "../../RemoveDialog/RemoveDialog";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { gql, useMutation } from "@apollo/client";
import { useToggle } from "../../../CustomHook/useToggle"

const DELETE_ADDRESS = gql`
  mutation DeleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;

const DeleteAddress = ({ id, mutateCustomerAddress }) => {
  const { toggle, status } = useToggle();

  const [deleteAddress, { loading: isDeleting }] = useMutation(DELETE_ADDRESS, {
    onCompleted: () => {
      toggle();
      mutateCustomerAddress();
      toast.success("Address deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleRemove = () => {
    deleteAddress({ variables: { id } });
  };

  return (
    <RemoveDialog
      handleRemove={handleRemove}
      status={status}
      toggle={toggle}
      isMutating={isDeleting}
      title="Are you sure you want to remove the address?"
      button={
        <Button
          className={"min-w-auto h-[35px] !text-14"}
          variant={"outlineDark"}
        >
          Remove
        </Button>
      }
    />
  );
};

export default DeleteAddress;
