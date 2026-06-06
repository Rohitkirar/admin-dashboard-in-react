import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicRouteNames from "../../constants/PublicRouteNames";
import { useAuth } from "../../hooks/useAuth";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  api?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (
    name: string,
    email: string,
    password: string,
  ): FormErrors => {
    const errs: FormErrors = {};
    if (!name) {
      errs.name = "Name is required.";
    }
    if (!email) {
      errs.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    return errs;
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name: string = (formData.get("name") as string).trim();
    const email: string = (formData.get("email") as string).trim();
    const password: string = (formData.get("password") as string).trim();

    const validationErrors = validate(name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      navigate(PublicRouteNames.HOME);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.";
      setErrors({ api: message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      <h1 className="text-2xl font-bold text-center mt-8">Register Page</h1>

      {errors.api && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-600">{errors.api}</p>
        </div>
      )}
      <div className="flex justify-center items-center mt-8">
        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
          onSubmit={handleRegister}
        >
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
              name="name"
              type="text"
              onChange={() => clearFieldError("name")}
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
              name="email"
              onChange={() => clearFieldError("email")}
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
              name="password"
              onChange={() => clearFieldError("password")}
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Registering..." : "Register"}
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
