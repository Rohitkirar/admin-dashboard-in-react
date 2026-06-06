import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import PublicRouteNames from "../constants/PublicRouteNames";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return (
    <React.Fragment>
      {isAuthenticated ? children : <Navigate to={PublicRouteNames.LOGIN} />}
    </React.Fragment>
  );
};

export default AuthProtected;
