import React from 'react';
import useProfile from '../../hooks/useProfile';
export default function ProfileOrders() {
  const { data, isLoading } = useProfile();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">

      {data.orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded flex justify-between"
        >
          <div>
            <p className="font-semibold">Order #{order.id}</p>
            <p>Status: {order.status}</p>
          </div>

          <div>
            <p>Amount: {order.amountPaid} ₪</p>
            <p>Payment: {order.paymentStatus || "pending"}</p>
          </div>
        </div>
      ))}

    </div>
  );
}
