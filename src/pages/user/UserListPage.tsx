import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import type { Column } from "../../components/Table";
import PrivateRouteNames from "../../constants/PrivateRouteNames";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import type { User } from "../../store/slices/userSlice";

const columns: Column<User>[] = [
  {
    header: "ID",
    accessor: "id",
    className: "w-16",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Role",
    accessor: "role",
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          String(value).toLowerCase() === "admin"
            ? "bg-violet-100 text-violet-700"
            : "bg-stone-100 text-stone-600"
        }`}
      >
        {String(value ?? "—")}
      </span>
    ),
  },
  {
    header: "Created At",
    accessor: "createdAt",
    render: (value) => (
      <span>{value ? new Date(String(value)).toLocaleDateString() : "—"}</span>
    ),
  },
];

const UserListPage = () => {
  const navigate = useNavigate();
  const { users, getUsers } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        await getUsers();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load users.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Users</h1>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors duration-150"
            onClick={() => navigate(PrivateRouteNames.USER_CREATE)}
          >
            + Add User
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
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
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Table
          columns={columns}
          data={users}
          isLoading={loading}
          keyExtractor={(row) => row.id}
          emptyMessage="No users found."
        />
      </div>
    </React.Fragment>
  );
};

export default UserListPage;
