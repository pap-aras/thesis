import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function New_Quiz_F_Grade() {
  const navigate = useNavigate();

  return (
    <>
         <div id="quiz-page" className="quiz-page">
            <h1 className="headers">Διάλεξε τον τύπο quiz</h1>
            <button id="multiple-btn" className="multiple-btn" onClick = {() => navigate('/multiple-f-grade')}>Πολλαπλής επιλογής</button>
            <button id="right-wrong-btn" className="right-wrong-btn" onClick={() => navigate('/right-wrong-f-grade')}>Σωστό-Λάθος</button>
            <button id="filling-btn" className="filling-btn" onClick={() => navigate('/filling-f-grade')}>Συμπλήρωση κενών</button>
         </div>
            <button id="return" className="return-btn class-rtn" onClick={() => navigate('/student/f-grade-quiz')}>Πίσω</button>
    </>

    );
    }