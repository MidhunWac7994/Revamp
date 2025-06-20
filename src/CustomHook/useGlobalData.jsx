
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_CUSTOMER_DETAILS,
  GET_FILTER_ATTRIBUTES,
} from  '../components/FilterAttributeAndCustomerdetailQuery/FilterAttributeAndCustomerdetailQuery';

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_CUSTOMER_DETAILS, {
    skip: !localStorage.getItem("token"),
  });

  const {
    data: filterData,
    loading: filterLoading,
    error: filterError,
  } = useQuery(GET_FILTER_ATTRIBUTES);

  const availableAttributes =
    filterData?.__type?.inputFields?.map((f) => f.name) || [];

  const value = {
    user: userData?.customer || null,
    isSignedIn: !!userData?.customer,
    availableAttributes,
    loading: userLoading || filterLoading,
    error: userError || filterError,
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
