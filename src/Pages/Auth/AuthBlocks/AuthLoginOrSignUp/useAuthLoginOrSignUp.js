import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast }  from  'sonner'
import { SIGN_IN_VIEW, SIGN_UP_VIEW } from '../../../../components/Constants'
import { useAuthContext } from '../../useAuth';

const useAuthLoginOrSignUp = () => {
  const formApiRef = useRef(null);
  const { handleAuthView, handleUserName, username, formDataRef } =
  useAuthContext();
  
  const [verifyCustomer, { loading }] = useMutation(VERIFY_USER, {
      onCompleted: (data) => {
          const result = data?.verifyCustomer;
      if (result?.customer_exist) {
        handleAuthView(SIGN_IN_VIEW);
        if (result?.message !== "Customer already exist") {
            toast.success(result.message, { duration: 8000 });
        }
    } else {
        toast.error(result?.message, { duration: 8000 });
        handleAuthView(SIGN_UP_VIEW);
    }
},
    onError: (err) => {
        console.error(err);
        toast.error(err?.message || "Login failed", { id: "login error" });
    },
});

const initialValues = {
    username,
  };
  
  const handleSubmit = ({ values }) => {
      const { username: value } = values;
      
      if (value) {
          handleUserName(value);
          verifyCustomer({ variables: { value } });
        }
    };
    
    const handleUserRegistration = () => handleAuthView(SIGN_UP_VIEW);
    
    return {
    formApiRef,
    initialValues,
    handleSubmit,
    handleUserRegistration,
    loading,
    formDataRef,
    handleAuthView,
  };
};

export default useAuthLoginOrSignUp;

const VERIFY_USER = gql`
  mutation VerifyCustomer($value: String!) {
    verifyCustomer(value: $value) {
      customer_exist
      message
    }
  }
`;
