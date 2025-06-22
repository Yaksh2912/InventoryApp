import React from 'react';
import Navbar from '../components/Navbar';
import '../assets/styles/Landing.css';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <section className="landing-hero">
        <div className="hero-content">
          <h1>Welcome to <span>InventoryPro</span></h1>
          <p>
            Streamline your stock tracking and operations with our intuitive, modern inventory management tool.
          </p>
          <p>
            Perfect for warehouses, retail stores, and small businesses—InventoryPro simplifies your day-to-day management with clarity and precision.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
