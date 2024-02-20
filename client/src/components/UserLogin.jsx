// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';// Import useNavigate from react-router-dom

const UserLogin = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const history = useNavigate(); // Use useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log('Login successful:', response.data);
      alert(response.data.user.id)
      localStorage.setItem("id",response.data.user.id);
      alert('Login successful!');
      history('/book'); // Use history as a function to navigate
    } catch (error) {
      console.error('Login failed:', error);
      alert("Login failed. Please try again.")
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Link to="/admin" className='admin'><button>Admin Login</button></Link>

      <form onSubmit={handleSubmit} className='registration-form'>
        <input type="text" name="usernameOrEmail" placeholder="Username or Email" value={formData.usernameOrEmail} onChange={handleChange} required />
        {/* Use "usernameOrEmail" as the name attribute */}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>Not a user? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default UserLogin;
