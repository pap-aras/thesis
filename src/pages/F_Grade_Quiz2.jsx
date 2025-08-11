import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function F_Grade_Quiz() {
  const navigate = useNavigate();

  return (
    <>
       <div id="quiz-page" className="quiz-page">
        <h1 className="headers">ΣΤ' ΤΑΞΗ</h1>
        <h2 className="sub-headers">2ο ΤΜΗΜΑ</h2>
        <button
          id="new-btn"
          className="quiz new-btn"
          onClick={() => navigate('/new-quiz-f-grade')}
        >
          Νέο Quiz
        </button>
        <button
          id="all-quizzes-btn"
          className="quiz all-quizzes-btn"
          onClick={() => navigate('/all-quizzes-f-grade')}
        >
          Όλα τα Quiz
        </button>
      </div>
      <button
        id="home-btn"
        className="return-btn class-rtn"
        onClick={() => navigate('/')}
      >
        Έξοδος
      </button>
      <footer className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
      </footer> 
    </>
  );
}