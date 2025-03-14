import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", { username, email, password });

      if (res.data.success) {
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setErrorMessage(res.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  // Inline styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      maxWidth: "350px",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      backgroundColor: loading ? "#ccc" : "#28a745",
      color: "white",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "5px",
      width: "100%",
    },
    error: {
      color: "red",
      fontWeight: "bold",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button onClick={handleRegister} disabled={loading} style={styles.button}>
        {loading ? "Registering..." : "Register"}
      </button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    </div>
  );
};

// Prop validation
Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Register;
