import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherLogin() {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_code: classCode.trim().toUpperCase() })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Λάθος κωδικός τμήματος!');
      }

      const data = await response.json();

      // Save teacher info in local storage
      localStorage.setItem('teacherInfo', JSON.stringify(data));

    // Navigate based on last digit of class code
    const lastDigit = classCode.trim().slice(-1);
    if (lastDigit === '1') {
      navigate('/student/f-grade-quiz');
    } else if (lastDigit === '2') {
      navigate('/student/f-grade-quiz2');
    }

    } catch (err) {
      setError(err.message);
    }

    setClassCode('');
  };

  return (
        <>
            <div id="teacher-page" className="verify-page">
                <h3>Παρακαλώ πληκτρολογήστε τον κωδικό σας!</h3>
                
                    <input
                        className="input-txt"
                        type="password"
                        id="input"
                        placeholder="Εισαγωγή κωδικού"
                        value={classCode}
                        onChange={e => setClassCode(e.target.value)}
                    />
                    <button
                        className="submit-btn"
                        id="submit-btn"
                        type="submit"
			onClick={handleSubmit}
                    >
                        Είσοδος
                    </button>
                
                {error && <p className="wrong-code">{error}</p>}
            </div>
            <button
                className="return-btn teacher-rtrn"
                id="home-btn"
                onClick={() => navigate('/')}
            >
                Πίσω στην αρχική
            </button>
            <footer className="footer">
                <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
            </footer>
        </>
    );
}

export default TeacherLogin;
