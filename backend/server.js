const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'transactions.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create transactions table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      } else {
        console.log('Transactions table ready.');
      }
    });
  }
});

// Routes

// Get all transactions
app.get('/api/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions ORDER BY date DESC, id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add a new transaction
app.post('/api/transactions', (req, res) => {
  const { type, amount, description, date } = req.body;
  if (!type || !amount || !description || !date) {
    return res.status(400).json({ error: 'Please provide type, amount, description, and date' });
  }

  const sql = 'INSERT INTO transactions (type, amount, description, date) VALUES (?, ?, ?, ?)';
  const params = [type, amount, description, date];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: {
        id: this.lastID,
        type,
        amount,
        description,
        date
      }
    });
  });
});

// Delete a transaction
app.delete('/api/transactions/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM transactions WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'deleted',
      changes: this.changes
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
