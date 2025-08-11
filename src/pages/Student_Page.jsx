import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Student_Page() {
  const navigate = useNavigate();

  return (
    <>
    <header>
            <h1 className="headers">ΔΙΑΛΕΞΕ ΤΗΝ ΤΑΞΗ ΣΟΥ</h1>
        </header>
        <div className="classes">
            <button id="class1-btn" className="class-btn" onClick={() => navigate('/student/a-grade')}>Α' ΔΗΜΟΤΙΚΟΥ</button>
            <button id="class2-btn" className="class-btn" onClick={() => navigate('/student/b-grade')}>Β' ΔΗΜΟΤΙΚΟΥ</button>
            <button id="class3-btn" className="class-btn" onClick={() => navigate('/student/c-grade')}>Γ' ΔΗΜΟΤΙΚΟΥ</button>
            <button id="class4-btn" className="class-btn" onClick={() => navigate('/student/d-grade')}>Δ' ΔΗΜΟΤΙΚΟΥ</button>
            <button id="class5-btn" className="class-btn" onClick={() => navigate('/student/e-grade')}>Ε' ΔΗΜΟΤΙΚΟΥ</button>
            <button id="class6-btn" className="class-btn" onClick={() => navigate('/student/student-verification')}>ΣΤ' ΔΗΜΟΤΙΚΟΥ</button>
            <button className="return-btn" onClick={() => navigate('/')}>Πίσω στην αρχική</button>
        </div>
    <footer className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
    </footer>
    </>
    );
}