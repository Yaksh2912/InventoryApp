import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <button className={`hamburger-btn ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>InventoryPro</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')} className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => navigate('/products')} className={location.pathname === '/products' ? 'active' : ''}>Products</li>
          <li onClick={() => navigate('/sales')} className={location.pathname === '/sales' ? 'active' : ''}>Sales</li>
          <li onClick={() => navigate('/purchases')} className={location.pathname === '/purchases' ? 'active' : ''}>Purchase</li>
          <li onClick={() => navigate('/reports')} className={location.pathname === '/reports' ? 'active' : ''}>Reports</li>
          <li onClick={handleLogout} className="logout-link">Logout</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
