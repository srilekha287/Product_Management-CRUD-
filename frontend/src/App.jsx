import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from '../pages/ProductList';
import ProductDetails from '../pages/ProductDetails';
import AddProduct from "../pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App
