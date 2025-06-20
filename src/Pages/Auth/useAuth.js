import { useAtom } from "jotai";
import { createContext, useState, useRef, useContext } from "react";
import { authViewAtom } from '../../Jotai/authAtom';

export const AuthContext = createContext();

const useAuth = () => {
   const [authView, setAuthView] = useAtom(authViewAtom);
  const [username, setUsername] = useState("");
  const formDataRef = useRef(null);

  const handleAuthView = (view) => setAuthView(view);
  const handleUserName = (name) => setUsername(name);

  return {
    authView,
    handleAuthView,
    username,
    handleUserName,
    formDataRef,
  };
};

export default useAuth;

export const useAuthContext = () => useContext(AuthContext);
