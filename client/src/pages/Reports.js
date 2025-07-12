import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Reports.css';
import { getAllProducts } from '../services/productService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#a1887f', '#c2185b'];

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    const generateReport = async () => {
      try {
        const products = await getAllProducts();

        const data = products.map((product) => {
          const sold = product.salesHistory.reduce((sum, sale) => sum + sale.qty, 0);
          const purchased = product.purchaseHistory.reduce((sum, purchase) => sum + purchase.qty, 0);
          const revenue = sold * product.price;

          return {
            name: product.name,
            department: product.department,
            sold,
            purchased,
            revenue,
          };
        });

        setReportData(data);
      } catch (err) {
        console.error('Failed to generate report:', err);
      }
    };

    generateReport();
  }, []);

  const filteredData = departmentFilter
    ? reportData.filter((item) => item.department === departmentFilter)
    : reportData;

  const departmentSales = Object.values(
    filteredData.reduce((acc, item) => {
      acc[item.department] = acc[item.department] || { department: item.department, sold: 0 };
      acc[item.department].sold += item.sold;
      return acc;
    }, {})
  );

  const departments = [...new Set(reportData.map((item) => item.department))];

  return (
    <div className="reports-container">
      <Sidebar />
      <main className="reports-main">
        <h1 className="reports-title">Inventory Reports</h1>

        <div className="filters" style={{ marginBottom: '20px' }}>
          <label htmlFor="dept">Filter by Department: </label>
          <select
            id="dept"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Table View */}
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
              {filteredData.map((item, i) => (
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

        {/* Charts */}
        <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '40px' }}>
          {/* Bar Chart: Revenue */}
          <div style={{ flex: '1' }}>
            <h3>Revenue by Product</h3>
            <BarChart width={500} height={300} data={filteredData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Pie Chart: Department-wise Sales */}
          <div style={{ flex: '1' }}>
            <h3>Department-wise Sales</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={departmentSales}
                dataKey="sold"
                nameKey="department"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {departmentSales.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
