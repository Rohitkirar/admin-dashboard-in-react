import React from "react";
import { Link } from "react-router-dom";
import PublicRouteNames from "../constants/PublicRouteNames";

const RegisterPage = () => {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold text-center mt-8">Register Page</h1>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              {" "}
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-4">
        <Link
          to={PublicRouteNames.LOGIN}
          className="text-blue-500 hover:text-blue-700"
        >
          Already have an account? Login here.
        </Link>
      </div>
      <div className="text-center mt-4">
        <Link
          to={PublicRouteNames.HOME}
          className="text-gray-500 hover:text-gray-700"
        >
          Back to Home
        </Link>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
