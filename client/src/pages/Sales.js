import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/SalesPurchases.css';
import { getAllProducts } from '../services/productService';

const Sales = () => {
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const products = await getAllProducts();

        const allSales = products.flatMap((product) =>
          product.salesHistory.map((entry, index) => ({
            ...entry,
            product: product.name,
            department: product.department,
            id: `${product._id}-sale-${index}`,
          }))
        );

        setSalesHistory(allSales);
      } catch (err) {
        console.error('Failed to fetch sales:', err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="sales-container">
      <Sidebar />
      <main className="sales-main">
        <h1 className="sales-title">Sales History</h1>
        {salesHistory.length === 0 ? (
          <p>No sales recorded yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Department</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.product}</td>
                  <td>{entry.department}</td>
                  <td>{entry.qty}</td>
                  <td>{new Date(entry.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Sales;
