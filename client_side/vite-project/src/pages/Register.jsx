import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import bgImage from "../assets/images/bg2.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <style>
        {`
          input::placeholder, select {
            color: #b3b3b3;
            opacity: 1;
          }
          .register-button {
            padding: 0.75rem;
            background: #50db85;
            color: #000000;
            border: none;
            border-radius: 8px;
            font-size: 25px;
            cursor: pointer;
            margin-top: 50px;
            width: 100%;
            font-weight: bold;
          }
          .register-button:hover {
            background: #28b65f;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        <div style={styles.row}>
          <div style={styles.field}>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sample@gmail.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*******"
              required
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.rolefield}>
          <label>Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={styles.roleinput}
          >
            <option value="librarian">Librarian</option>
            <option value="student">Student</option>
          </select>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" className="register-button">
          Register
        </button>

        <div style={styles.link}>
          Already have an account?{" "}
          <span
            style={{ color: "#0a1b69", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
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
    width: "900px",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    color: "#0a1b69",
    fontSize: "23px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },
  roleinput: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #475569",
    backgroundColor: "#074168",
    color: "#ffffff",
    fontSize: "20px",
    marginTop: "10px",
    width: "820px",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #475569",
    backgroundColor: "#074168",
    color: "#ffffff",
    fontSize: "20px",
    marginTop: "10px",
    width: "400px",
  },
  error: {
    color: "#dc2626",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "15px",
  },
  link: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "1.2rem",
  },
};
