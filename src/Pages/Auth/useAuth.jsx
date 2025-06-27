import { useAtom } from "jotai";
import { createContext, useState, useRef, useContext } from "react";
import { authViewAtom } from "../../Jotai/authAtom";

export const AuthContext = createContext(undefined);

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

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
