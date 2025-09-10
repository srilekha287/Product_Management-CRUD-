import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, updateProduct, fetchProducts } from "../src/api";

export default function AddProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function loadProduct() {
      setLoading(true);
      try {
        const products = await fetchProducts();
        const product = products.find((p) => p._id === id);
        if (product) {
          setName(product.name);
          setPrice(product.price);
          setCategory(product.category);
          setDescription(product.description);
          setImage(product.image);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError("Product name is required");
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0)
      return setError("Enter a valid price");

    setError("");

    try {
      if (id) {
        await updateProduct(id, {
          name: name.trim(),
          price: parsedPrice,
          category: category.trim(),
          description: description.trim(),
          image: image.trim(),
        });
        alert(" Product updated successfully!");
      } else {
        await addProduct({
          name: name.trim(),
          price: parsedPrice,
          category: category.trim(),
          description: description.trim(),
          image: image.trim(),
        });
        alert("Product added successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to save product");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="w-4/5 bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            placeholder="Description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-4 justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 cursor-pointer"
            >
              {id ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
