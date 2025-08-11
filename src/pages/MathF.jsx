import { useLocation } from 'react-router-dom';
import '../index.css';
import React from 'react';
import QuizApp from './QuizApp'; // adjust path if needed

export default function MathF() {
    const location = useLocation();

    // Get selectedLesson from state or query
    const selectedLesson = location.state?.lesson || "MathF";

    return (
        <>
            <span className="info-btn">i
            <span className="points-calculation">Για κάθε σωστή απάντηση κερδίζετε 10 πόντους. Για κάθε λάθος απάντηση χάνετε 5 πόντους.</span>
            </span>
            <QuizApp selectedLesson={selectedLesson} />
            <footer id="page-footer" className="footer">
                <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
            </footer>
        </>
    );
}
