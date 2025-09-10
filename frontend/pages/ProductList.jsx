import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct,updateProduct } from "../src/api";
import ProductCard from "../components/ProductCard";
import SearchSortBar from "../components/SearchSortBar";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const params = { q: q || undefined, sort: sort || undefined };
      const items = await fetchProducts(params);
      setProducts(items);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [q, sort]);

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await deleteProduct(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 cursor-pointer"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>
      </div>

      <SearchSortBar q={q} setQ={setQ} sort={sort} setSort={setSort} onRefresh={load} />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-3">
            Showing {products.length} products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onDelete={handleDelete} onEdit={() => navigate(`/edit-product/${p._id}`)}/>
              
            ))}
          </div>
        </>
      )}
    </div>
  );
}
