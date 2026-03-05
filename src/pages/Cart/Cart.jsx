import usecart from "../../hooks/usecart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";

export default function Cart() {

  const { data, isLoading, isError, error } = usecart();
const{mutate,isPending}=useRemoveFromCart();
  const handleRemove = (id) => {
    console.log("remove item", id);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">

        {data.items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border-b p-4"
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

            <div className="flex items-center gap-4">
              <div className="text-lg font-bold">
                ${item.totalPrice}
              </div>

              <button disabled={isPending}
                onClick={() => mutate(item.productId)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
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

    </div>
  );
}