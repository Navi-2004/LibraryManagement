// EntryPage.js

import React, { useState } from 'react';
import axios from '../axiosConfig';

const EntryPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    publish_date: '',
    copies: '',
    floor_no: '',
    shelf_no: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/books', formData); // Assuming your backend API endpoint is '/api/books' for inserting books
      alert('Book information added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book information. Please try again.');
    }
  };  
   
  return (
    <div>
      <h2>Add Book Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </div>
        <div>
          <label>Publish Date:</label>
          <input type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />
        </div>
        <div>
          <label>Copies:</label>
          <input type="number" name="copies" value={formData.copies} onChange={handleChange} />
        </div>
        <div>
          <label>Floor No:</label>
          <input type="number" name="floor_no" value={formData.floor_no} onChange={handleChange} />
        </div>
        <div>
          <label>Shelf No:</label>
          <input type="number" name="shelf_no" value={formData.shelf_no} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryPage;
