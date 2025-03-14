import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      if (res.data.username) {
        localStorage.setItem("username", res.data.username);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in. Please try again.");
      console.error(error);
    }
  };

  // Inline styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      maxWidth: "300px",
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
      backgroundColor: "#007BFF",
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
      <h2>Login</h2>
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
      <button onClick={handleLogin} style={styles.button}>Login</button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    </div>
  );
};

// Prop validation
Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
