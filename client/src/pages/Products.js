import React from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Products.css';

const productData = [
  {
    name: 'Alternator',
    stock: 15,
    price: 2500,
    department: 'Electrical',
    description: 'Converts mechanical energy into electrical energy in a car.',
  },
  {
    name: 'Radiator',
    stock: 8,
    price: 3400,
    department: 'Engine',
    description: 'Cools the engine by circulating coolant through metal fins.',
  },
  {
    name: 'Shock Absorber',
    stock: 20,
    price: 1900,
    department: 'Suspension',
    description: 'Absorbs and dampens shock impulses from road irregularities.',
  },
];

const Products = () => {
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
