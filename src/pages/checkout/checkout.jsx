import usecart from "../../hooks/usecart";
import useCheckOut from "../../hooks/useCheckOut";
import { useState } from "react";
export default function Checkout() {

  const { data, isLoading, isError, error } = usecart();
  const {mutate,isPending}=useCheckOut();
  const[paymentMethod,setPaymentMethod]=useState("Cash");

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">

        {data.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between border-b p-4"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {item.productName}
              </h2>

              <p className="text-gray-500">
                Price: ${item.price}
              </p>

              <p className="text-gray-500">
                Quantity: {item.count}
              </p>
            </div>

            <div className="text-lg font-bold">
              ${item.totalPrice}
            </div>

          </div>
        ))}

        <div className="flex justify-between items-center p-6 bg-gray-50">

          <span className="text-xl font-semibold">
            Total
          </span>

          <span className="text-2xl font-bold text-green-600">
            ${data.cartTotal}
          </span>

        </div>

      </div>

<div className="flex flex-row gap-47 flex items-center">
     <fieldset className="fieldset     ">
  <legend className="fieldset-legend">Payment Method</legend>

  <select className="select w-full flex items-center" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
    
    <option value="" disabled selected>
      Select payment method
    </option>

    <option value="visa">Visa Card</option>
    <option value="Cash">Cash</option>

  </select>

  <span className="label">Choose how you want to pay</span>
</fieldset>
<button onClick={()=>mutate(paymentMethod)}    className="  cursor-pointer text-white  bg-black px-10 py-4 rounded-2xl hover:bg-gray-800 ">Pay Now</button>
</div>
    </div>
  );
}