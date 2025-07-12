import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/SalesPurchases.css';
import { getAllProducts } from '../services/productService';

const Purchases = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const products = await getAllProducts();

        const allPurchases = products.flatMap((product) =>
          product.purchaseHistory.map((entry, index) => ({
            ...entry,
            product: product.name,
            department: product.department,
            id: `${product._id}-purchase-${index}`,
          }))
        );

        setPurchaseHistory(allPurchases);
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="sales-container">
      <Sidebar />
      <main className="sales-main">
        <h1 className="sales-title">Purchase History</h1>
        {purchaseHistory.length === 0 ? (
          <p>No purchases recorded yet.</p>
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
              {purchaseHistory.map((entry) => (
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

export default Purchases;
