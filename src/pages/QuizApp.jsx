import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const videos = {
    MathF: [
        { title: "Math D Video 1", url: "https://www.youtube.com/embed/kTCO4qfTLpw" },
        { title: "Math D Video 2", url: "https://www.youtube.com/embed/XmrSB7XIxbw" },
        { title: "Math D Video 3", url: "https://www.youtube.com/embed/919O1a7ayRo" }
    ],
    glwssaD: [
        { title: "Glwssa D Video 1", url: "https://www.youtube.com/watch?v=jkl012" },
        { title: "Glwssa D Video 2", url: "https://www.youtube.com/watch?v=mno345" },
        { title: "Glwssa D Video 3", url: "https://www.youtube.com/watch?v=pqr678" }
    ],
    historyD: [
        { title: "History D Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "History D Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "History D Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    meletiD: [
        { title: "Meleti D Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Meleti D Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Meleti D Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    englishD: [
        { title: "English D Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "English D Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "English D Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    tpeD: [
        { title: "Tpe D Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Tpe D Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Tpe D Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    glwssaF: [
        { title: "Glwssa F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Glwssa F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Glwssa F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    MathD: [
        { title: "Math F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Math F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Math F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    geographyF: [
        { title: "Geography F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Geography F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Geography F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    physicsF: [
        { title: "Physics F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Physics F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Physics F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    kpaF: [
        { title: "Kpa F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Kpa F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Kpa F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    englishF: [
        { title: "English F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "English F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "English F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    germanF: [
        { title: "German F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "German F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "German F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    frenchF: [
        { title: "French F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "French F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "French F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ],
    tpeF: [
        { title: "Tpe F Video 1", url: "https://www.youtube.com/watch?v=stu901" },
        { title: "Tpe F Video 2", url: "https://www.youtube.com/watch?v=vwx234" },
        { title: "Tpe F Video 3", url: "https://www.youtube.com/watch?v=yz5678" }
    ]
};


export default function QuizApp({ selectedLesson }) {
    const navigate = useNavigate();
    const [currentLesson] = useState(selectedLesson);
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [numberOfQuizzes, setNumberOfQuizzes] = useState(0);
    const [correctGuess, setCorrectGuess] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (!currentLesson) return;

        // Fetch quizzes from your backend API, which should load from your SQLite DB
        fetch(`http://localhost:5000/api/all_quizzes/FG1`)
            .then(res => res.json())
            .then(data => {
                setQuizzes(data);
            })
            .catch(err => {
                console.error("Error fetching quizzes:", err);
                setQuizzes([]);
            });
    }, [currentLesson]);

    const checkAnswer = (selectedLetter, correctLetter, index) => {
        const allButtons = document.querySelectorAll(`#quiz-options-${index} .quiz-btn`);
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
            btn.style.cursor = 'not-allowed';
        });

        if (selectedLetter.toLowerCase() === correctLetter.toLowerCase()) {
            allButtons.forEach(btn => {
                if (btn.value === selectedLetter) btn.style.backgroundColor = 'green';
            });
            setCorrectGuess(prev => prev + 1);
            setScore(prev => prev + 10);
            setFeedback('correct');
        } else {
            allButtons.forEach(btn => {
                if (btn.value === selectedLetter) btn.style.backgroundColor = 'red';
                if (btn.value === correctLetter) btn.style.backgroundColor = 'green';
            });

            if (score > 0) {
                setScore(prev => prev - 5);
            }
            setFeedback('wrong');
        }

        setNumberOfQuizzes(prev => prev + 1);
    };

    const loadNextQuiz = () => {
        const allButtons = document.querySelectorAll(`#quiz-options-${currentQuizIndex} .quiz-btn`);
        const wasAnswered = Array.from(allButtons).every(btn => btn.disabled);

        if (!wasAnswered) {
            alert('Απάντησε στο quiz για να συνεχίσεις.');
            return;
        }

        setFeedback(null);

        if (currentQuizIndex + 1 < quizzes.length) {
            setCurrentQuizIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const fireConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: Math.random(), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const loadVideos = () => {
        const videoPlayer = document.getElementById('video-player');
        videoPlayer.innerHTML = '';
        const lessonVideos = videos[currentLesson];
        if (!lessonVideos) {
            videoPlayer.innerHTML = '<p>Δεν υπάρχουν διαθέσιμα βίντεο για αυτό το μάθημα.</p>';
            return;
        }

        lessonVideos.forEach(video => {
            const iframe = document.createElement('iframe');
            iframe.width = "320";
            iframe.height = "180";
            iframe.src = video.url.includes('embed/') ? video.url : video.url.replace('watch?v=', 'embed/');
            iframe.title = video.title;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.marginRight = "10px";
            videoPlayer.appendChild(iframe);
        });
    };

    const renderResults = () => {
        // Hide the span with class "info-btn" if it exists
        const infoBtn = document.querySelector('.info-btn');
        if (infoBtn) {
            infoBtn.style.visibility = 'hidden';
        }
        let message = '';
        if (numberOfQuizzes === 0) {
            message = 'Δεν απάντησες σε κανένα quiz. Προσπάθησε ξανά!';
        } else if (correctGuess === numberOfQuizzes) {
            message = 'Συγχαρητήρια! Ολοκλήρωσες όλα τα quiz με επιτυχία!';
            fireConfetti();
        } else if (correctGuess > numberOfQuizzes / 2) {
            message = 'Μπράβο! Ολοκλήρωσες πάνω από τα μισά quiz!';
            fireConfetti();
        } else if (correctGuess === numberOfQuizzes / 2) {
            message = 'Ολοκλήρωσες τα μισά quiz. Συνέχισε την εξάσκηση!';
            fireConfetti();
        } else if (correctGuess === 0) {
            message = 'Δεν απάντησες σωστά σε κανένα quiz. Μην τα παρατάς!';
        } else {
            message = 'Συνέχισε την προσπάθεια! Μπορείς να τα πας καλύτερα!';
        }

        return (
            <div className="results" id="results" style={{ opacity: 1 }}>
                <p className="congrats-msg">{message}</p>
                <p><span className="stats">Βαθμολογία:</span> {score}</p>
                <p><span className="stats">Συνολικά Quiz:</span> {numberOfQuizzes}</p>
                <p><span className="stats">Συνολικές σωστές απαντήσεις:</span> {correctGuess}</p>
                <button className="return-btn" onClick={() => navigate('/student/f-grade')}>Πίσω στα μαθήματα</button>
                <button id="extra" className="extra" onClick={loadVideos}>Έξτρα υλικό:</button>
                <div id="video-player" style={{ marginTop: '20px', display: 'flex' }}></div>
            </div>
        );
    };

    if (!quizzes || quizzes.length === 0) {
        // Hide the span with class "info-btn" if it exists
        const infoBtn = document.querySelector('.info-btn');
        if (infoBtn) {
            infoBtn.style.visibility = 'hidden';
        }
        return (
            <div className="no-quizzes">
                <p>😔</p>
                <p>Δεν υπάρχουν διαθέσιμα quiz για αυτό το μάθημα.</p>
                <button className="return-btn" onClick={() => navigate('/student/f-grade')}>Πίσω στα μαθήματα</button>
            </div>
        );
    }

    if (showResults) return renderResults();

    const currentQuiz = quizzes[currentQuizIndex];

    return (
  <div id="grade">
    {/* Guard rendering if currentQuiz is undefined */}
    {currentQuiz ? (
      <>
        <h2 className="quiz-question">{currentQuiz.question}</h2>

        <div className="quiz-options" id={`quiz-options-${currentQuizIndex}`}>
          {/* Multiple choice options */}
          {currentQuiz.type === "multiple_choice_quizzes" && currentQuiz.options && Array.isArray(currentQuiz.options) ? (
  Object.entries(currentQuiz.options).map(([letter, text]) => (
    <button
      key={letter}
      className="quiz-btn"
      value={letter}
      onClick={() =>
        checkAnswer(letter, currentQuiz.correctAnswer, currentQuizIndex)
      }
    >
      {text}
    </button>
  ))
          ) : currentQuiz.type === "fill_blank_quizzes" ? (
            // Fill-in-the-blank form
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const userAnswer = e.target.elements.fillAnswer.value.trim();
                checkAnswer(userAnswer, currentQuiz.correctAnswer, currentQuizIndex);
              }}
            >
              <input
                type="text"
                name="fillAnswer"
                className="quiz-input"
                placeholder="Γράψτε την απάντηση..."
                autoComplete="off"
                required
              />
              <button type="submit" className="quiz-btn">
                Υποβολή
              </button>
            </form>
          ) : (
            // Right/Wrong buttons as fallback
            <>
              <button
                className="quiz-btn"
                value="right"
                onClick={() =>
                  checkAnswer("right", currentQuiz.correctAnswer, currentQuizIndex)
                }
              >
                Σ
              </button>
              <button
                className="quiz-btn"
                value="wrong"
                onClick={() =>
                  checkAnswer("wrong", currentQuiz.correctAnswer, currentQuizIndex)
                }
              >
                Λ
              </button>
            </>
          )}
        </div>

        {/* Feedback message */}
        {feedback && (
          <p className={`feedback ${feedback === "correct" ? "correct" : "wrong"}`}>
            {feedback === "correct" ? "Σωστό!" : "Λάθος!"}
          </p>
        )}

        <button className="return-btn" onClick={() => navigate("/student/f-grade")}>
          Πίσω
        </button>
        <button className="return-btn" onClick={loadNextQuiz}>
          Επόμενο
        </button>
      </>
    ) : (
      <p>Loading quiz...</p>
    )}
  </div>
);

}
