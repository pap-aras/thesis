import { useNavigate } from 'react-router-dom';
import '../index.css';
import DisplayAllQuizzes from './DisplayQuizzes';

export default function All_Quizzes_F_Grade() {
  const navigate = useNavigate();

  return (
    <>
      <DisplayAllQuizzes grade="FG1" />

      <button
        id="back-btn"
        className="return-btn all-quiz-rtn"
        onClick={() => navigate('/student/f-grade-quiz')}
      >
        Πίσω
      </button>
      <footer className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
      </footer>
    </>
  );
}
