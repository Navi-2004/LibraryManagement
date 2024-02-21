const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs'); // Adding fs module requirement

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') }
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to add a new book
app.post('/books', (req, res) => {
  const { title, author, subject, publish_date, copies, floor_no, shelf_no } = req.body;
  const query = 'INSERT INTO library (title, author, subject, publish_date, copies, floor_no, shelf_no) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [title, author, subject, publish_date, copies, floor_no, shelf_no], (error, results) => {
    if (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Failed to add book information' });
    } else {
      res.status(201).json({ message: 'Book information added successfully' });
    }
  });
});

// Route to fetch all books
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM library';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    } else {
      res.json(results);
    }
  });
});

// Route to register a new user
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const checkExistingQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkExistingQuery, [username, email], (error, results) => {
    if (error) {
      console.error('Error checking existing user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [username, email, password], (error) => {
        if (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(query, [usernameOrEmail, usernameOrEmail], (error, results) => {
    if (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0 || results[0].password !== password) {
      res.status(401).json({ message: 'Invalid username/email or password' });
    } else {
      const user = results[0];
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
