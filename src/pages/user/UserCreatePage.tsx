import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRouteNames from "../../constants/PrivateRouteNames";
import { useUser } from "../../hooks/useUser";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: FormValues): FormErrors => {
  const errs: FormErrors = {};
  if (!values.name.trim()) {
    errs.name = "Name is required.";
  }
  if (!values.email.trim()) {
    errs.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errs.email = "Enter a valid email address.";
  }
  if (!values.password) {
    errs.password = "Password is required.";
  } else if (values.password.length < 8) {
    errs.password = "Password must be at least 8 characters.";
  }
  if (!values.confirmPassword) {
    errs.confirmPassword = "Please confirm the password.";
  } else if (values.password !== values.confirmPassword) {
    errs.confirmPassword = "Passwords do not match.";
  }
  return errs;
};

// ─── Small reusable field wrapper ─────────────────────────────────────────────

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, htmlFor, error, children }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={htmlFor}
      className="font-sans text-sm font-medium text-stone-700"
    >
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-colors duration-150 focus:ring-2 ${
    hasError
      ? "border-red-300 bg-red-50 focus:ring-red-200"
      : "border-stone-300 bg-white focus:border-stone-400 focus:ring-stone-100"
  }`;

// ─── Page ─────────────────────────────────────────────────────────────────────

const UserCreatePage = () => {
  const navigate = useNavigate();
  const { createUser } = useUser();
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: FormValues = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      password: (fd.get("password") as string) ?? "",
      confirmPassword: (fd.get("confirmPassword") as string) ?? "",
    };

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create user.";
      setErrors({ api: message });
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate(PrivateRouteNames.USERS);
  };

  return (
    <React.Fragment>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-8 py-6 shadow-xl">
            <svg
              className="animate-spin h-8 w-8 text-stone-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-sm font-medium text-stone-600">Creating user…</p>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(PrivateRouteNames.USERS)}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors duration-150"
          title="Back to Users"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Create User</h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Add a new user account to the system.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-4 max-w-2xl mx-auto">
        {/* API error banner */}
        {errors.api && (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <svg
              className="h-4 w-4 text-red-500 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <p className="text-sm text-red-600">{errors.api}</p>
          </div>
        )}

        {/* Form card */}
        <div className="rounded-xl border border-stone-200 bg-white shadow-sm shadow-stone-950/5">
          <div className="px-6 py-4 border-b border-stone-100">
            <h2 className="text-sm font-semibold text-stone-700">
              User Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <Field label="Full Name" htmlFor="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Alice Johnson"
                  className={inputClass(!!errors.name)}
                  onChange={() => clearFieldError("name")}
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. alice@example.com"
                  className={inputClass(!!errors.email)}
                  onChange={() => clearFieldError("email")}
                />
              </Field>

              {/* Password */}
              <Field
                label="Password"
                htmlFor="password"
                error={errors.password}
              >
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className={`${inputClass(!!errors.password)} pr-10`}
                    onChange={() => clearFieldError("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </Field>

              {/* Confirm Password */}
              <Field
                label="Confirm Password"
                htmlFor="confirmPassword"
                error={errors.confirmPassword}
              >
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className={`${inputClass(!!errors.confirmPassword)} pr-10`}
                    onChange={() => clearFieldError("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-600"
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </Field>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-100 bg-stone-50 rounded-b-xl">
              <button
                type="button"
                onClick={() => navigate(PrivateRouteNames.USERS)}
                className="px-4 py-2 text-sm font-medium text-stone-600 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 hover:text-stone-900 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {loading ? "Creating…" : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserCreatePage;
