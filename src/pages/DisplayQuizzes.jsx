import { useEffect, useState } from "react";

export default function DisplayAllQuizzes({ grade }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/all_quizzes/${grade}`)
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error("Error fetching quizzes:", err));
  }, [grade]);

  return (
    <div>
      <h2>Όλες τα quiz για {grade}</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz, i) => (
          <div key={i} className="quiz-card">
            <p><b>{quiz.type}</b>: {quiz.question}</p>
            <p>Απάντηση: {quiz.answer}</p>
          </div>
        ))
      ) : (
        <p>Δεν υπάρχουν quiz</p>
      )}
    </div>
  );
}
