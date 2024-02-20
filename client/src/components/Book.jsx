import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12); // Number of initially visible books
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    subject: '',
    publishDate: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books'); // Assuming your backend server is running on port 5000
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSeeMore = () => {
    setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 12); // Increase visible books by 12
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
      book.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
      book.publish_date.toLowerCase().includes(filters.publishDate.toLowerCase())
    );
  });

  return (
    <div className="book-container">
      <h2>Books</h2>
      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Filter by author"
          value={filters.author}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Filter by subject"
          value={filters.subject}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="publishDate"
          placeholder="Filter by publish date"
          value={filters.publishDate}
          onChange={handleFilterChange}
        />
      </div>
      <p>Total Books: {filteredBooks.length}</p> {/* Display the count of filtered books */}
      <div className="books-grid">
        {filteredBooks.slice(0, visibleBooks).map((book) => ( // Only display visibleBooks number of books
          <div className="book" key={book.library_id}>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Subject: {book.subject}</p>
              <p>Publish Date: {book.publish_date}</p>
              <p>Copies: {book.copies}</p>
              <p>Floor No: {book.floor_no}</p>
              <p>Shelf No: {book.shelf_no}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleBooks < filteredBooks.length && ( // Show "See More" button if there are more books to display
        <button onClick={handleSeeMore}>See More</button>
      )}
    </div>
  );
};

export default Book;
