// Import necessary modules
// import { executeQuery} from './db';
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require ("dotenv").config();

// Create an Express application
const app = express();   
const allowedOrigin = 'https://librarymanagement-cq3k.onrender.com';
app.use(cors({
  origin: allowedOrigin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// // Define MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',    
  database: 'LibraryManagement'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define a route for inserting a new book
app.post('/books', async (req, res) => {
  const { title, author, subject, publish_date, copies, floor_no, shelf_no } = req.body;

  // Insert book information into the database
   await executeQuery(
    'INSERT INTO library (title, author, subject, publish_date, copies, floor_no, shelf_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, author, subject, publish_date, copies, floor_no, shelf_no],
    (err, result) => {
      if (err) {
        console.error('Error inserting book:', err);
        res.status(500).json({ error: 'Failed to add book information' });
        return;
      }
      // Send success response
      res.status(201).json({ message: 'Book information added successfully', bookId: result.insertId });
    }
  );
});

app.get('/books', async(req, res) => {
    const query = 'SELECT * FROM library';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching books from database:', err);
        res.status(500).json({ error: 'Failed to fetch books' });
        return;
      }
      res.json(results);
    });
  });


  app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);
  
    // Check if user already exists
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Insert new user into the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
  
  app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;
  
    // Check if username or email exists in the database
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username/email or password' });
      }
  
      const user = results[0];
  
      // Compare password (without bcrypt)
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid username/email or password' });
      }
  
      // If login is successful, return success message and user details
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    });
  });
  
// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
