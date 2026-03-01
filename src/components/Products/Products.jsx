// pages/Products.jsx
import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/use Products";

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  }

  if (isError) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error.message || "Error loading products"}
      </h2>
    );
  }

  const products = data.response.data || [];

  return (
    <div className="container mx-auto px-6 py-10 bg-amber-700">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="block bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
          >
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name || "product"}
                className="max-h-full max-w-full object-contain"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x300?text=No+Image")
                }
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 truncate">
                {product.name || "No Name"}
              </h2>

              <p className="text-gray-600 mb-2">⭐ {product.rate}</p>

              <p className="text-green-600 font-bold text-xl mb-4">
                ${product.price}
              </p>

              <button
                className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                onClick={(e) => {
                  e.preventDefault(); // يمنع الانتقال للصفحة عند الضغط على الزر
                  console.log("Add to Cart clicked", product.id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}