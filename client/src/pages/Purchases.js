import React from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/SalesPurchases.css';
import { useLocation } from 'react-router-dom';

const Purchases = () => {
  const location = useLocation();
  const { state } = location;
  const products = state?.products || [];

  const purchaseHistory = products.flatMap((product) =>
    product.purchaseHistory.map((entry, index) => ({
      ...entry,
      product: product.name,
      department: product.department,
      id: `${product.name}-${index}`,
    }))
  );

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