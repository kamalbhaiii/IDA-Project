import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/UI/GoogleAuth/GoogleAuth";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Redirect to backend Google Auth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome to Survey Platform</h2>
        <GoogleAuth onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  box: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
};

export default Login;
