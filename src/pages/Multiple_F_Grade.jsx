import { useNavigate } from 'react-router-dom';
import '../index.css';
import React, { useState, useEffect } from 'react';

export default function Multiple_F_Grade() {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState('');
  const [question, setQuestion] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizzes, setQuizzes] = useState({});

async function createQuiz() {
  if (!lesson || !question.trim() || !answerA.trim() || !answerB.trim() || !answerC.trim() || !answerD.trim() || !correctAnswer) {
    alert("Please fill in all fields!");
    return;
  }

  const newQuiz = {
    lesson,
    question,
    answerA,
    answerB,
    answerC,
    answerD,
    correctAnswer
  };

  try {
    const res = await fetch('http://localhost:5000/api/multiple-choice-quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuiz)
    });

    const data = await res.json();
    if (res.ok) {
      alert("Quiz created successfully!");
      setLesson('');
      setQuestion('');
      setAnswerA('');
      setAnswerB('');
      setAnswerC('');
      setAnswerD('');
      setCorrectAnswer('');
    } else {
      alert(data.error || "Failed to create quiz");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to connect to the server");
  }
}

 

  return (
    <>
    <div className="quiz-border">
        <div >
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
        </div>
        <div id="quiz-creation" className="quiz-creation">
            <input
                type="text"
                id="question"
                className="quiz-layout"
                placeholder="Εισάγετε την ερώτηση"
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />
            <div className="answer-option">
                <input
                    type="text"
                    id="answerA"
                    className="quiz-layout"
                    placeholder="Εισάγετε την απάντηση 1"
                    value={answerA}
                    onChange={e => setAnswerA(e.target.value)}
                />
            </div>
            <div className="answer-option">
                <input
                    type="text"
                    id="answerB"
                    className="quiz-layout"
                    placeholder="Εισάγετε την απάντηση 2"
                    value={answerB}
                    onChange={e => setAnswerB(e.target.value)}
                />
            </div>
            <div className="answer-option">
                <input
                    type="text"
                    id="answerC"
                    className="quiz-layout"
                    placeholder="Εισάγετε την απάντηση 3"
                    value={answerC}
                    onChange={e => setAnswerC(e.target.value)}
                />
            </div>
            <div className="answer-option">
                <input
                    type="text"
                    id="answerD"
                    className="quiz-layout"
                    placeholder="Εισάγετε την απάντηση 4"
                    value={answerD}
                    onChange={e => setAnswerD(e.target.value)}
                />
            </div>
            <select
                id="correctAnswer"
                className="subject-select"
                value={correctAnswer}
                onChange={e => setCorrectAnswer(e.target.value)}
                placeholder="Επιλέξτε τη σωστή απάντηση"
            >
                <option value="" disabled>Επιλέξτε τη σωστή απάντηση</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <button id="create-quiz" className="submit-btn" onClick={createQuiz}>Δημιουργία Quiz</button>
            <button
                id="back-btn"
                className="return-btn"
                onClick={() => navigate('/new-quiz-f-grade')}
            >
                Πίσω
            </button>
        </div>
    </div>
    </>
  );
}