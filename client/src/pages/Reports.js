import React from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Reports.css';

const sampleData = [
  { name: 'Alternator', sold: 10, purchased: 20, revenue: 25000, department: 'Electrical' },
  { name: 'Radiator', sold: 6, purchased: 10, revenue: 20400, department: 'Engine' },
  { name: 'Shock Absorber', sold: 12, purchased: 15, revenue: 22800, department: 'Suspension' },
];

const Reports = () => {
  return (
    <div className="reports-container">
      <Sidebar />
      <main className="reports-main">
        <h1 className="reports-title">Inventory Reports</h1>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Department</th>
                <th>Sold</th>
                <th>Purchased</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.sold}</td>
                  <td>{item.purchased}</td>
                  <td>₹{item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reports;
