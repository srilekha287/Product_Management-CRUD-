import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <p className="text-gray-500 p-6">Loading...</p>;
  if (!product) return <p className="text-red-500 p-6">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-4 text-indigo-600 hover:underline"
      >
        ← Back to Products
      </Link>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-72 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full md:w-1/2 h-72 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Image
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-indigo-600 text-xl font-semibold mt-2">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category || "—"}
          </p>
          <p className="text-gray-700 mt-4">{product.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}
