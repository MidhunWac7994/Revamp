import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalData } from '../../CustomHook/useGlobalData';
import { AUTH_ROUTES } from  '../../components/Constants';

const ProtectedRoute = () => {
  const { isSignedIn } = useGlobalData(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const isProtectedRoute = AUTH_ROUTES.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    if (!isSignedIn && isProtectedRoute) {
      navigate("/"); 
    }
  }, [isSignedIn, isProtectedRoute, navigate]);

  return null; 
};

export default ProtectedRoute;
    