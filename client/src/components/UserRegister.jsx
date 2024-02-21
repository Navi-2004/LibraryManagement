// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData); // Assuming your backend API endpoint for registration is '/api/register'
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      navigate('/login')
      // Redirect or show success message
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
      // Handle registration failure
    }
  };

  return (
    <div>
    <h2>Register</h2>
    <form onSubmit={handleSubmit} className="registration-form">
    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="form-input" />
    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-input" />
    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-input" />
    <button type="submit" className="form-button">Register</button>
    <p>Already a User? <Link to="/">Login</Link> </p>
  </form>
  </div>
  );
};

export default UserRegister;
