import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./Routes";
import MasterLayout from "../layouts/MasterLayout";
import AuthProtected from "./AuthProtected";
import AuthRoutes from "./AuthRoutes";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        {PublicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.headerLess ? (
                <AuthRoutes>{route.element}</AuthRoutes>
              ) : (
                <MasterLayout element={route.element} />
              )
            }
          />
        ))}

        {PrivateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <AuthProtected>
                <MasterLayout element={route.element} />
              </AuthProtected>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default Index;
