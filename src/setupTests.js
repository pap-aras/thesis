import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Insert quiz
app.post('/api/quizzes', (req, res) => {
  const { lesson, question, answerA, answerB, answerC, answerD, correctAnswer } = req.body;

  if (!lesson || !question || !answerA || !answerB || !answerC || !answerD || !correctAnswer) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO quizzes (lesson, question, answerA, answerB, answerC, answerD, correctAnswer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [lesson, question, answerA, answerB, answerC, answerD, correctAnswer], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    return res.status(200).json({ message: 'Quiz saved', id: result.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
