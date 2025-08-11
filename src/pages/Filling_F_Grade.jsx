import { useNavigate } from 'react-router-dom';
import '../index.css';
import React, { useState } from 'react';

export default function Filling_F_Grade() {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

 function createQuiz() {
  const trimmedQuestion = question.trim();
  const trimmedAnswer = correctAnswer.trim();

  if (!trimmedQuestion || !trimmedAnswer || !lesson) {
    alert('Please fill all the fields!');
    return;
  }

  const teacherUsername = localStorage.getItem('teacherUsername'); // e.g., 'teacher1'

  const newQuiz = {
    teacher: teacherUsername,
    lesson,
    question: trimmedQuestion,
    answer: trimmedAnswer,
  };

  fetch('http://localhost:5000/api/fill-blank-quizzes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuiz)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Quiz created!');
        setQuestion('');
        setCorrectAnswer('');
      } else {
        alert(data.error || 'Failed to create quiz');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Server error');
    });
}


  return (
    <div className='quiz-border fill-blank-fix'>
      <select
        id="lesson"
        className="subject-select"
        value={lesson}
        onChange={e => setLesson(e.target.value)}
      >
        <option value="" disabled>Επιλέξτε το μάθημα</option>
        <option value="MathF">Μαθηματικά</option>
        <option value="HistoryF">Ιστορία</option>
        <option value="GeographyF">Γεωγραφία</option>
        <option value="PhysicsF">Φυσική</option>
        <option value="KpaF">ΚΠΑ</option>
        <option value="GermanF">Γερμανικά</option>
        <option value="FrenchF">Γαλλικά</option>
        <option value="EnglishF">Αγγλικά</option>
        <option value="TechnologyF">ΤΠΕ</option>
        <option value="GlwssaF">Γλώσσα</option>
      </select>

      <div className="quiz-form">
        <input
          type="text"
          id="question"
          className="quiz-layout"
          placeholder="Εισάγετε την ερώτηση"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <input
          type="text"
          id="correctAnswer"
          className="quiz-layout"
          placeholder="Εισάγετε τη σωστή απάντηση"
          value={correctAnswer}
          onChange={e => setCorrectAnswer(e.target.value)}
        />
      </div>

      <button id="create-quiz" className="submit-btn" onClick={createQuiz}>
        Δημιουργία Quiz
      </button>
      <button
        id="back-btn"
        className="return-btn"
        onClick={() => navigate('/new-quiz-f-grade')}
      >
        Πίσω
      </button>
    </div>
  );
}
