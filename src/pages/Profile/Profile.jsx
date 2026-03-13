import React from "react";
import { Link, Outlet } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
export default function Profile() {
    const {data} = useProfile();
    console.log(data);
  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* Title */}
      <h2 className="text-3xl font-bold mt-10 mb-6">My Profile</h2>

      {/* Links */}
      <div className="flex gap-8 mb-10 border-b pb-4">
        <Link
          to=""
          className="text-lg font-medium hover:text-blue-600 transition"
        >
          Info
        </Link>

        <Link
          to="ProfileOrders"
          className="text-lg font-medium hover:text-blue-600 transition"
        >
          Orders
        </Link>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <Outlet />
      </div>

    </div>
  );
}