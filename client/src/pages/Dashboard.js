import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Dashboard.css';

const departments = ['Engine', 'Electrical', 'Suspension', 'Body', 'Interior', 'Brakes', 'Transmission'];

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { name: 'Alternator', stock: 15, price: 2500, department: 'Electrical', salesHistory: [], purchaseHistory: [] },
    { name: 'Radiator', stock: 8, price: 3400, department: 'Engine', salesHistory: [], purchaseHistory: [] },
    { name: 'Shock Absorber', stock: 20, price: 1900, department: 'Suspension', salesHistory: [], purchaseHistory: [] },
  ]);

  const [form, setForm] = useState({ name: '', stock: '', price: '', department: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const newProduct = {
      name: form.name,
      stock: parseInt(form.stock),
      price: parseFloat(form.price),
      department: form.department,
      salesHistory: [],
      purchaseHistory: [],
    };

    if (!form.name || !form.department || isNaN(newProduct.stock) || isNaN(newProduct.price)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...products];
      newProduct.salesHistory = updated[editingIndex].salesHistory;
      newProduct.purchaseHistory = updated[editingIndex].purchaseHistory;
      updated[editingIndex] = newProduct;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setForm({ name: '', stock: '', price: '', department: '' });
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    setForm({ name: '', stock: '', price: '', department: '' });
    setEditingIndex(null);
  };

  const handleSale = (index) => {
    const qty = parseInt(prompt('Enter quantity to sell:'));
    if (isNaN(qty) || qty <= 0) return;
    const updated = [...products];
    if (updated[index].stock < qty) return alert('Not enough stock!');
    updated[index].stock -= qty;
    updated[index].salesHistory.push({ qty, date: new Date().toISOString() });
    setProducts(updated);
  };

  const handlePurchase = (index) => {
    const qty = parseInt(prompt('Enter quantity to purchase:'));
    if (isNaN(qty) || qty <= 0) return;
    const updated = [...products];
    updated[index].stock += qty;
    updated[index].purchaseHistory.push({ qty, date: new Date().toISOString() });
    setProducts(updated);
  };

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && (!filterDept || p.department === filterDept)
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h1>
        </div>

        <form className="product-form" onSubmit={handleAddOrUpdate}>
          <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
          <select name="department" value={form.department} onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <button type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
        </form>

        <div className="filters">
          <input type="text" placeholder="Search product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <h2 style={{ marginTop: '30px' }}>Inventory by Department</h2>
        {departments.map((dept) => {
          const deptItems = filteredProducts.filter((p) => p.department === dept);
          if (!deptItems.length) return null;

          return (
            <div key={dept} className="department-block">
              <h3>{dept} Department</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deptItems.map((item, i) => {
                    const index = products.indexOf(item);
                    return (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>₹{item.price}</td>
                        <td>
                          <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                          <button onClick={() => handleSale(index)} className="sale-btn">Sell</button>
                          <button onClick={() => handlePurchase(index)} className="purchase-btn">Purchase</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Dashboard;
