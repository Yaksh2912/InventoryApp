import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../assets/styles/Dashboard.css';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  sellProduct,
  purchaseProduct
} from '../services/productService';

const departments = ['Engine', 'Electrical', 'Suspension', 'Body', 'Interior', 'Brakes', 'Transmission'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', stock: '', price: '', department: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      stock: parseInt(form.stock),
      price: parseFloat(form.price),
      department: form.department,
    };

    if (!form.name || !form.department || isNaN(payload.stock) || isNaN(payload.price)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      if (editingIndex !== null) {
        const id = products[editingIndex]._id;
        await updateProduct(id, payload);
      } else {
        await addProduct(payload);
      }

      fetchProducts();
      setForm({ name: '', stock: '', price: '', department: '' });
      setEditingIndex(null);
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setForm({
      name: product.name,
      stock: product.stock,
      price: product.price,
      department: product.department,
    });
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const id = products[index]._id;
    try {
      await deleteProduct(id);
      fetchProducts();
      setForm({ name: '', stock: '', price: '', department: '' });
      setEditingIndex(null);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleSale = async (index) => {
    const qty = parseInt(prompt('Enter quantity to sell:'));
    if (isNaN(qty) || qty <= 0) return;

    const id = products[index]._id;
    try {
      await sellProduct(id, qty);
      fetchProducts();
    } catch (err) {
      alert('Sale failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handlePurchase = async (index) => {
    const qty = parseInt(prompt('Enter quantity to purchase:'));
    if (isNaN(qty) || qty <= 0) return;

    const id = products[index]._id;
    try {
      await purchaseProduct(id, qty);
      fetchProducts();
    } catch (err) {
      alert('Purchase failed: ' + (err.response?.data?.message || err.message));
    }
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
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
        </form>

        <div className="filters">
          <input type="text" placeholder="Search product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
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
                    const index = products.findIndex((p) => p._id === item._id);
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
