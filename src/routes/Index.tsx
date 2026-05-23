import React from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./Routes";
import MasterLayout from "../layouts/MasterLayout";

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
                route.element
              ) : (
                <MasterLayout element={route.element} />
              )
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default Index;
