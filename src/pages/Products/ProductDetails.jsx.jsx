import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useproduct";

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useProduct(id);

  if (isLoading)
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  if (isError)
    return <h2 className="text-center mt-10 text-red-500">{error.message}</h2>;

  const product = data.response;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* صورة المنتج */}
        <div className="md:w-1/2 flex items-center justify-center p-4 rounded-2xl shadow-lg">
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

        {/* تفاصيل المنتج */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">
            {product.name || "No Name"}
          </h1>
          <p className="text-gray-600 mb-2">⭐ {product.rate}</p>
          <p className="font-bold text-2xl mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
        </div>
      </div>
    </div>
  );
}