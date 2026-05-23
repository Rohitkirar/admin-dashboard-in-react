import React from "react";
import PrivateRouteNames from "../constants/PrivateRouteNames";

const PublicRoutes: Array<{ path: string; component: React.FC }> = [
  { path: "/", component: () => <h1>Home Page</h1> },
];

const PrivateRoutes: Array<{ path: string; component: React.FC }> = [
  {
    path: PrivateRouteNames.DASHBOARD,
    component: () => <h1>Dashboard Page</h1>,
  },
];

export { PrivateRoutes, PublicRoutes };
