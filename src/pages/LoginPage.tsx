import React from "react";
import PublicRouteNames from "../constants/PublicRouteNames";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold text-center mt-8">Login Page</h1>
      <div className="flex justify-center items-center mt-8">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              {" "}
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to={PublicRouteNames.SIGN_UP}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
