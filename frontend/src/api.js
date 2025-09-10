import axios from "axios";

const BASE_URL ="http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export async function fetchProducts(params = {}) {
  try {
    const res = await api.get("/api/products", { params });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch products");
  }
}

export async function addProduct(data) {
  try {
    const res = await api.post("/api/products", data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add product");
  }
}

export async function deleteProduct(id) {
  try {
    const res = await api.delete(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete product");
  }
}

export async function updateProduct(id, data) {
  try {
    const res = await api.put(`/api/products/${id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update product");
  }
}
