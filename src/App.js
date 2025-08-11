import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
//import AGrade from './pages/A_Grade';
//import AGradeQuiz from './pages/A_Grade_Quiz';
import TeacherPage from './pages/Teacher_Page';
import StudentPage from './pages/Student_Page';
//import BGrade from './pages/B_Grade';
//import CGrade from './pages/C_Grade';
//import DGrade from './pages/D_Grade';
//import EGrade from './pages/E_Grade';
import FGrade from './pages/F_Grade';
//import BGradeQuiz from './pages/B_Grade_Quiz';
//import CGradeQuiz from './pages/C_Grade_Quiz';
//import DGradeQuiz from './pages/D_Grade_Quiz';
//import EGradeQuiz from './pages/E_Grade_Quiz';
import FGradeQuiz from './pages/F_Grade_Quiz';
import FGradeQuiz2 from './pages/F_Grade_Quiz2';
import NewQuizFGrade from './pages/New_Quiz_F_Grade';
import AllQuizzesFGrade from './pages/All_Quizzes_F_Grade';
import UnderConstruction from './pages/UnderConstruction';
import MathF from './pages/MathF'; 
import DisplayAllQuizzes from './pages/DisplayQuizzes';
import MultipleFGrade from './pages/Multiple_F_Grade';
import RightWrongFGrade from './pages/Right_Wrong_F_Grade';
import FillingFGrade from './pages/Filling_F_Grade';
import StudentVerify from './pages/Student_Verify';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/a-grade" element={<UnderConstruction />} />
        <Route path="/student/a-grade-quiz" element={<UnderConstruction />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/b-grade" element={<UnderConstruction />} />
        <Route path="/student/c-grade" element={<UnderConstruction />} />
        <Route path="/student/d-grade" element={<UnderConstruction />} />
        <Route path="/student/e-grade" element={<UnderConstruction />} />
        <Route path="/student/f-grade" element={<FGrade />} />
        <Route path="/student/b-grade-quiz" element={<UnderConstruction />} />
        <Route path="/student/c-grade-quiz" element={<UnderConstruction />} />
        <Route path="/student/d-grade-quiz" element={<UnderConstruction />} />
        <Route path="/student/e-grade-quiz" element={<UnderConstruction />} />
        <Route path="/student/f-grade-quiz" element={<FGradeQuiz />} />
        <Route path="/student/f-grade-quiz2" element={<FGradeQuiz2 />} />
        <Route path="/new-quiz-f-grade" element={<NewQuizFGrade />} />
        <Route path="/all-quizzes-f-grade" element={<AllQuizzesFGrade />} />
        <Route path="/student/f-grade/MathF" element={<MathF />} />
        <Route path="/display-all-quizzes" element={<DisplayAllQuizzes className="F" />} />
        <Route path="/multiple-f-grade" element={<MultipleFGrade />} />
        <Route path="/right-wrong-f-grade" element={<RightWrongFGrade />} />
        <Route path="/filling-f-grade" element={<FillingFGrade />} />
        <Route path="/student/student-verification" element={<StudentVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;