import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useproduct";
import useAddtoCart from "../../hooks/useAddtoCart";

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useProduct(id);
  const { mutate, isPending } = useAddtoCart();

  if (isLoading)
    return <h2 className="text-center mt-10 text-xl text-white">Loading...</h2>;

  if (isError)
    return <h2 className="text-center mt-10 text-red-500">{error.message}</h2>;

  const product = data.response;

  return (
    <div className="container mx-auto px-6 pt-28 pb-10 text-white">

      <div className="flex flex-col md:flex-row gap-10">

        {/* Image */}
        <div className="md:w-1/2 bg-gray-800 flex items-center justify-center p-4 rounded-2xl shadow-lg">
          <img
            src={product.image}
            alt={product.name || "Product"}
            className="max-h-[400px] max-w-full object-contain"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image")
            }
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">
            {product.name || "No Name"}
          </h1>

          <p className="mb-2">⭐ {product.rate}</p>

          <p className="text-green-400 font-bold text-2xl mb-6">
            ${product.price}
          </p>

          <p className="mb-6">{product.description}</p>

          <button
            onClick={() => mutate({ ProductId: product.id, Count: 1 })}
            disabled={isPending}
            className="w-full md:w-1/2 bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition"
          >
            {isPending ? "Adding..." : "Add to Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}