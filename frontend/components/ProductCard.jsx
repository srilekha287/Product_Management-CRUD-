import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <Link to={`/products/${product._id}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md mb-3">
            No Image
          </div>
        )}
      </Link>
      <Link
        to={`/products/${product._id}`}
        className="text-lg font-semibold text-gray-800 hover:text-indigo-600"
      >
        {product.name}
      </Link>

      <p className="text-indigo-600 font-bold mt-1">₹{product.price}</p>
      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 cursor-pointer"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer"
          onClick={() => onDelete(product)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
