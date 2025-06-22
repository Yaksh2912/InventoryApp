import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">InventoryPro</div>
      <div className="nav-links">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
