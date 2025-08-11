import { useNavigate } from 'react-router-dom';
import '../index.css';
import React from 'react';

export default function F_Grade() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/student');
  };

  return (
    <>
      <div className="home_description">
        <header className="class-title">
            <h1>Μαθήματα της ΣΤ'</h1>
        </header>
        <div id="f-grade-lessons" className="f_grade-lessons">
            <h2>Διάλεξε ένα μάθημα!</h2>
            <button className="lesson1F-btn" id="glwssaF" disabled><span>ΓΛΩΣΣΑ</span></button>
            <button className="lesson2F-btn" id="mathF" onClick={() => navigate('/student/f-grade/MathF', { state: { lesson: 'MathF' } })}><span>ΜΑΘΗΜΑΤΙΚΑ</span></button>
            <button className="lesson3F-btn" id="historyF" disabled><span>ΙΣΤΟΡΙΑ</span></button>
            <button className="lesson4F-btn" id="geographyF" disabled><span>ΓΕΩΓΡΑΦΙΑ</span></button>
            <button className="lesson5F-btn" id="physicsF" disabled><span>ΦΥΣΙΚΗ</span></button>
            <button className="lesson6F-btn" id="kpaF" disabled><span>ΚΠΑ</span></button>
            <button className="lesson7F-btn" id="englishF" disabled><span>ΑΓΓΛΙΚΑ</span></button>
            <button className="lesson8F-btn" id="germanF" disabled><span>ΓΕΡΜΑΝΙΚΑ</span></button>
            <button className="lesson9F-btn" id="frenchF" disabled><span>ΓΑΛΛΙΚΑ</span></button>
            <button className="lesson10F-btn" id="tpeF" disabled><span>ΤΠΕ</span></button>
            <button className="return-btn" id="home-btn" onClick={goHome}>Πίσω στις τάξεις</button>
        </div>
    </div>
    <footer id="page-footer" className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
    </footer>
    </>
  );
}