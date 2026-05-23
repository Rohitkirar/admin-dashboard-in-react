import React, { lazy } from "react";
import PrivateRouteNames from "../constants/PrivateRouteNames";
import PublicRouteNames from "../constants/PublicRouteNames";
import type { RouteProps } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

const PublicRoutes: Array<{ headerLess: boolean } & RouteProps> = [
  {
    path: "/",
    element: <HomePage />,
    headerLess: false,
  },
  {
    path: PublicRouteNames.LOGIN,
    element: <LoginPage />,
    headerLess: true,
  },
  {
    path: PublicRouteNames.SIGN_UP,
    element: <RegisterPage />,
    headerLess: true,
  },
];

const PrivateRoutes: Array<{ path: string; component: React.FC }> = [
  {
    path: PrivateRouteNames.DASHBOARD,
    component: () => <h1>Dashboard Page</h1>,
  },
];

export { PrivateRoutes, PublicRoutes };
