import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const styles = {
    navbarContainer: {
      width: "50%", // Occupy half of the page width
      margin: "0 auto", // Center it horizontally
      textAlign: "center",
      padding: "15px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      paddingBottom: "10px",
      borderBottom: "2px solid #ccc",
      color: "black",
      
    },
    navLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "15px",
    },
    link: {
      color: "black",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "8px 15px",
      borderRadius: "5px",
      backgroundColor: "#f0f0f0",
    },
    logoutBtn: {
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "8px 15px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1.2rem",
      borderRadius: "5px",
    },
  };

  return (
    <nav style={styles.navbarContainer}>
      {/* App Name */}
      <div style={styles.title}>MealMatrix Food App</div>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/home" style={styles.link}>Home</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

// Prop validation
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
