require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const query = 'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Error submitting form' });
      return;
    }
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
