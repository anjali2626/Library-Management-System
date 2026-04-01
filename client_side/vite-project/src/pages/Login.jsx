import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import bgImage from "../assets/images/bg2.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Both fields are required!");
      return;
    }

    try {
      const res = await login(formData);

      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(res.data));

      alert(`Welcome ${res.data.first_name} to ESSSL Institute Library.`);

      if (res.data.role === "librarian") {
        navigate("/librarian");
      } else {
        navigate("/studentdashboard");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <style>
        {`
          input::placeholder {
            color: #b3b3b3;
            opacity: 1;
          }
          .login-button {
            padding: 0.75rem;
            background: #50db85;
            color: #000000;
            border: none;
            border-radius: 8px;
            font-size: 25px;
            cursor: pointer;
            margin-top: 20px;
            width: 100%;
            font-weight: bold;
          }
          .login-button:hover {
            background: #28b65f;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

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

        {error && <div style={styles.error}>{error}</div>}

        <button className="login-button" type="submit">
          Login
        </button>

        <div style={styles.link}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#0a1b69", fontWeight: "bold" }}>
            Register here
          </Link>
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
    width: "500px",
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
