import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Products.css';
import { getAllProducts } from '../services/productService';

const Products = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProductData(data))
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  return (
    <div className="products-container">
      <Sidebar />
      <main className="products-main">
        <h1 className="products-title">Product Catalog</h1>
        <div className="products-grid">
          {productData.map((product, index) => (
            <div key={index} className="product-card">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-dept"><strong>Department:</strong> {product.department}</p>
              <p className="product-desc">{product.description}</p>
              <p className="product-stock"><strong>Stock:</strong> {product.stock}</p>
              <p className="product-price"><strong>Price:</strong> ₹{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
