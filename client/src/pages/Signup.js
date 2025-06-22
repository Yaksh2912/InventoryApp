import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.find((u) => u.email === formData.email)) {
      setError('User already exists');
      return;
    }

    const updatedUsers = [...storedUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('token', 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-msg">{error}</p>}
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
