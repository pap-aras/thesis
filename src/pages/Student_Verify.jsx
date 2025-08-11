import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentProfile() {
  const [code, setCode] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Called when user clicks "Submit"
  const handleSubmit = () => {
    fetch(`http://localhost:5000/api/student/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Λάθος κωδικός χρήστη!');
        return res.json();
      })
      .then(data => {
        setStudent(data);
        setError(null);
        navigate('/student/f-Grade'); // Navigate to F grade page
      })
      .catch(err => {
        setStudent(null);
        setError(err.message);
      });
      setCode('');
  };

  return (
    <>
      <header>
        <h1 className="headers">ΕΙΣΑΓΕΤΕ ΤΟΝ ΚΩΔΙΚΟ ΜΑΘΗΤΗ</h1>
      </header>
      <div className="verify-page">
        <input type="text" 
        className="input-txt" 
        placeholder="Εισαγωγή Κωδικού"  
        value={code}
        onChange={e => setCode(e.target.value)}>
        </input>
        <button className="submit-btn" onClick={handleSubmit}>Επιβεβαίωση</button>

        {error && <p className="wrong-code">{error}</p>}
      </div>
      <footer className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
      </footer>
    </>
  );
}

export default StudentProfile;
