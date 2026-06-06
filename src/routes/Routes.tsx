import { lazy } from "react";
import PublicRouteNames from "../constants/PublicRouteNames";
import type { RouteProps } from "react-router-dom";
import PrivateRouteNames from "../constants/PrivateRouteNames";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const UserListPage = lazy(() => import("../pages/user/UserListPage"));
const UserCreatePage = lazy(() => import("../pages/user/UserCreatePage"));

const PublicRoutes: Array<{ headerLess: boolean } & RouteProps> = [
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

const PrivateRoutes: Array<RouteProps> = [
  {
    path: PrivateRouteNames.HOME,
    element: <HomePage />,
  },
  {
    path: PrivateRouteNames.USERS,
    element: <UserListPage />,
  },
  {
    path: PrivateRouteNames.USER_CREATE,
    element: <UserCreatePage />,
  },
];

export { PrivateRoutes, PublicRoutes };
