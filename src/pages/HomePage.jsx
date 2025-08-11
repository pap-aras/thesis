import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
    <div id="home_page" className="home_page">
    <header>
        <h1 className="headers">Διαδικτυακή Πύλη</h1>
    </header>
        <h2 className="headers h2-home">Είμαι:</h2>
        <button className="home_btn homePage-btn" onClick={() => navigate('/student')}>
        Μαθητής/ρια
      </button>
      <button className="home_btn homePage-btn" onClick={() => navigate('/teacher')}>
        Διδάσκων/ουσα
      </button>
        </div>
    <p className="home_description"><strong>Η παρούσα ιστοσελίδα δημιουργήθηκε με στόχο την υποστήριξη της εξάσκησης και της περαιτέρω εκμάθησης των μαθητών, στο πλαίσιο της σχολικής διαδικασίας.</strong> Οι μαθητές έχουν τη δυνατότητα να απαντούν σε ερωτήσεις κουίζ που έχουν αναρτηθεί από τους διδάσκοντές τους. Με βάση τις απαντήσεις και τη βαθμολογία τους, το σύστημα τους προτείνει κατάλληλα βίντεο με στόχο την ενίσχυση και ανάπτυξη των δεξιοτήτων τους στους αντίστοιχους τομείς.</p>
    <footer className="footer">
        <p>&copy; 2025 Γεώργιος Παπαστεργίου. Με την επιφύλαξη παντός νομίμου δικαιώματος</p>
    </footer> 
    </>
  );
}
