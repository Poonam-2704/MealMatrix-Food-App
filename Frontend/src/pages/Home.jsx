import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  // Inline styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    logoutBtn: {
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.welcomeText}>Welcome, {username}!</h2>
      <button 
        onClick={() => { 
          localStorage.removeItem("username"); 
          navigate("/login"); 
        }} 
        style={styles.logoutBtn}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
