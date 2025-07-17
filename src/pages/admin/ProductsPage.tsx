// src/pages/admin/ProductsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import api from "../../services/api"; // Adjust the import based on your API setup

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const fetchProducts = async () => {
    const res = await api.get("/admin/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await axios.put(`/api/admin/products/${editingProduct.id}`, form);
    } else {
      await axios.post("/api/admin/products", form);
    }
    setForm({ name: "", description: "", price: "", image_url: "" });
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
    });
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Product Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInput}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInput}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInput}
          required
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleInput}
          required
        />
        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid gap-6">
        {products &&
          products?.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <p className="text-sm">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)}>
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
