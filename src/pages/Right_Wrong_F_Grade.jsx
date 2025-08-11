import { useNavigate } from 'react-router-dom';
import '../index.css';
import React, { useState } from 'react';

export default function Right_Wrong_F_Grade() {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('A');

  function createQuiz() {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion || !lesson) {
    alert('Please fill all the fields!');
    return;
  }

  const correct = answer === 'A'; // 'A' = σωστό -> true
  const newQuiz = {
    lesson,
    question: trimmedQuestion,
    correctAnswer: correct,
  };

  fetch('http://localhost:5000/api/right-wrong-quizzes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuiz)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Quiz created!');
        setQuestion('');
        setAnswer('A');
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
    <div className='quiz-border right-wrong-fix'>
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
        <select
          id="correctAnswer"
          className="subject-select"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        >
          <option value="A">Σωστό</option>
          <option value="B">Λάθος</option>
        </select>
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
