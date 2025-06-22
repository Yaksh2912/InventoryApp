import React from 'react';
import '../assets/styles/SalesHistory.css';


const SalesHistory = ({ products }) => {
  return (
    <div className="history-container">
      <h2>Sales History</h2>
      {products.map((product, index) => (
        product.salesHistory?.length > 0 && (
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
                {product.salesHistory.map((s, i) => (
                  <tr key={i}>
                    <td>{new Date(s.date).toLocaleString()}</td>
                    <td>{s.qty}</td>
                    <td>₹{s.price}</td>
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

export default SalesHistory;
