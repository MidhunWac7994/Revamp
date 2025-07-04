import { useMutation, gql } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { authTokenAtom } from "../Jotai/authAtom";
import useCartConfig from "./useCartConfig";
import { toast } from "sonner";
import { CARTID_KEY, LOGIN_TOKEN_KEY } from "../components/Constants";

const SIGN_OUT_MUTATION = gql`
  mutation CustomerLogout($token: String!) {
    customerLogout(token: $token) {
      status
      message
    }
  }
`;

export const useSignout = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const { fetchCartId } = useCartConfig();

  const [signOut, { loading: signingOut }] = useMutation(SIGN_OUT_MUTATION);

  const clearCacheAndResetStates = () => {
    localStorage.removeItem(LOGIN_TOKEN_KEY);
    localStorage.removeItem(CARTID_KEY);
    setAuthToken(null); 
    fetchCartId();
  };

  const handleSignOut = async () => {
    try {
      const { data } = await signOut({
        variables: {
          token: authToken,
        },
      });

      const tokenRevoked = data?.customerLogout;

      if (tokenRevoked?.status) {
        clearCacheAndResetStates();

        toast.success(
          tokenRevoked?.message || "You have successfully logged out",
          {
            id: "logged-out",
          }
        );

        navigate("/"); 
      } else {
        toast.error("Failed to log out", { id: "logout-error" });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        id: "logout-exception",
      });
    }
  };

  return {
    handleSignOut,
    signingOut,
    clearCacheAndResetStates,
  };
};
