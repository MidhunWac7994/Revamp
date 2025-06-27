import { createContext, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { authTokenAtom } from "../Jotai/authAtom";
import {
  GET_CUSTOMER_DETAILS,
  GET_FILTER_ATTRIBUTES,
} from "../components/FilterAttributeAndCustomerdetailQuery/FilterAttributeAndCustomerdetailQuery";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [token] = useAtom(authTokenAtom); // Get token from Jotai atom

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch, // Add refetch to allow manual refresh
  } = useQuery(GET_CUSTOMER_DETAILS, {
    skip: !token, // Skip query if no token
  });

  const {
    data: filterData,
    loading: filterLoading,
    error: filterError,
  } = useQuery(GET_FILTER_ATTRIBUTES);

  const availableAttributes =
    filterData?.__type?.inputFields?.map((f) => f.name) || [];

  
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const value = {
    user: userData?.customer || null,
    isSignedIn: !!userData?.customer && !!token, 
    availableAttributes,
    loading: userLoading || filterLoading,
    error: userError || filterError,
    refetchUser: refetch, 
  };

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalData must be used inside GlobalDataProvider");
  }
  return context;
};
