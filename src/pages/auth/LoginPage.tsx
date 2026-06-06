import React, { useState } from "react";
import PublicRouteNames from "../../constants/PublicRouteNames";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (email: string, password: string): FormErrors => {
    const errs: FormErrors = {};
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email: string = (formData.get("email") as string).trim();
    const password: string = (formData.get("password") as string).trim();

    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await loginUser(email, password);
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

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 max-w-xs">
          <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
            <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
              Login
            </span>
          </div>
          <form
            className="w-full h-max rounded px-3.5 py-2.5"
            onSubmit={handleLogin}
            noValidate
          >
            {errors.api && (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-sm text-red-600">{errors.api}</p>
              </div>
            )}
            <div className="mb-4 mt-2 space-y-1.5">
              <label
                htmlFor="email"
                className="font-sans antialiased text-sm text-stone-800 font-semibold"
              >
                Email
              </label>
              <div className="relative w-full">
                <input
                  id="email"
                  placeholder="someone@example.com"
                  type="email"
                  name="email"
                  onChange={() => clearFieldError("email")}
                  className={`w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:ring-none focus:ring-none peer ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 hover:border-red-400"
                      : "border-stone-200 hover:border-stone-300 focus:border-stone-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mb-4 space-y-1.5">
              <label
                htmlFor="password"
                className="font-sans antialiased text-sm text-stone-800 font-semibold"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  placeholder="************"
                  type="password"
                  name="password"
                  onChange={() => clearFieldError("password")}
                  className={`w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:ring-none focus:ring-none peer ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 hover:border-red-400"
                      : "border-stone-200 hover:border-stone-300 focus:border-stone-400"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="w-full px-3.5 pt-2 pb-3.5 rounded text-center">
            <small className="font-sans antialiased text-sm my-1 flex items-center justify-center gap-1 text-stone-600">
              Don't have an account?
              <Link
                to={PublicRouteNames.SIGN_UP}
                className="font-sans antialiased text-sm text-stone-500 font-bold"
              >
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
