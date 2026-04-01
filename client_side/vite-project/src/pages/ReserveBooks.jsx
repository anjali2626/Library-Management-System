import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reserveBook } from "../services/api";
import bgImage from "../assets/images/bg2.jpg";

export default function ReserveBooks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [formData, setFormData] = useState({
    student_name: role === "student" ? user?.first_name : "",
    book_name: book?.name || "",
    author: book?.author || "",
    reserved_date: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    if (!book) {
      alert("No book selected!");
      navigate(-1);
    }
  }, [book, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.student_name.trim() ||
      !formData.book_name ||
      !formData.author ||
      !formData.reserved_date
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await reserveBook(formData);
      alert("Book Reserved Successfully!");

      if (role === "librarian") {
        navigate("/librarian");
      } else {
        navigate("/studentdashboard");
      }
    } catch (error) {
      console.error("Reservation Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to reserve book");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Reserve Book</h2>
        
        <div style={styles.field}>
          <label>Student Name</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            readOnly={role === "student"}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Book Name</label>
          <input
            type="text"
            value={formData.book_name}
            readOnly
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Author</label>
          <input
            type="text"
            value={formData.author}
            readOnly
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Reserved Date</label>
          <input
            type="date"
            value={formData.reserved_date}
            readOnly
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Reserve
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff",
    padding: "2rem",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(5px)",       
    zIndex: 1,
  },
  form: {
    position: "relative",
    zIndex: 2,
    padding: "40px",
    width: "600px",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    color: "#0a1b69",
    fontSize: "23px",
    
    
  },
  title: {
    fontSize: "3rem",
    marginBottom: "3rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  field: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #475569",
    backgroundColor: "#074168",
    color: "#ffffff",
    fontSize: "20px",
    marginTop: "10px",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#50db85",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    fontSize: "25px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    fontWeight: "bold",
  },
};

