import React from 'react';
import '../assets/styles/SalesHistory.css';


const PurchaseHistory = ({ products }) => {
  return (
    <div className="history-container">
      <h2>Purchase History</h2>
      {products.map((product, index) => (
        product.purchaseHistory?.length > 0 && (
          <div key={index} className="history-block">
            <h3>{product.name} ({product.department})</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Price per Unit</th>
                </tr>
              </thead>
              <tbody>
                {product.purchaseHistory.map((p, i) => (
                  <tr key={i}>
                    <td>{new Date(p.date).toLocaleString()}</td>
                    <td>{p.qty}</td>
                    <td>₹{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ))}
    </div>
  );
};

export default PurchaseHistory;
