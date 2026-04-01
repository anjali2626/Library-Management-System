import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import LibrarianBooks from "./pages/LibrarianBooks";
import LibrarianStudents from "./pages/LibrarianStudents";
import StudentDashboard from "./pages/StudentDashboard";
import StudentBooks from "./pages/StudentBooks";
import BooksPage from "./pages/BooksPage";
import ReserveBooks from "./pages/ReserveBooks"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BooksPage />} />

        <Route path="/librarian" element={<LibrarianDashboard />} />
        <Route path="/librarianbooks" element={<LibrarianBooks/>} />
        <Route path="/librarianstudents" element={<LibrarianStudents/>} />

        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentbooks" element={<StudentBooks/>} />
        <Route path="/reserve" element={<ReserveBooks />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;



