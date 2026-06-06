import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PrivateRouteNames from "../constants/PrivateRouteNames";

const AuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      {isAuthenticated ? <Navigate to={PrivateRouteNames.HOME} /> : children}
    </React.Fragment>
  );
};

export default AuthRoutes;
