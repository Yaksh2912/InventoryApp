// src/services/productService.js
import api from '../api/axios';

// GET all products
export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// POST a new product
export const addProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

// PUT update existing product
export const updateProduct = async (id, updatedProduct) => {
  const response = await api.put(`/products/${id}`, updatedProduct);
  return response.data;
};

// DELETE a product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// PATCH stock after sale
export const sellProduct = async (id, qty) => {
  const response = await api.patch(`/products/${id}/sell`, { qty });
  return response.data;
};

// PATCH stock after purchase
export const purchaseProduct = async (id, qty) => {
  const response = await api.patch(`/products/${id}/purchase`, { qty });
  return response.data;
};
