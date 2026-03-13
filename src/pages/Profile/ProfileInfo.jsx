import React from 'react';
import useProfile from '../../hooks/useProfile';
export default function ProfileInfo() {
  const { data, isLoading } = useProfile();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">

      <div className="border p-4 rounded">
        <p className="font-semibold">Name</p>
        <p>{data.fullName}</p>
      </div>

      <div className="border p-4 rounded">
        <p className="font-semibold">Email</p>
        <p>{data.email}</p>
      </div>

      <div className="border p-4 rounded">
        <p className="font-semibold">Phone</p>
        <p>{data.phoneNumber}</p>
      </div>

      <div className="border p-4 rounded">
        <p className="font-semibold">City</p>
        <p>{data.city || "No city added"}</p>
      </div>

    </div>
  );
}
