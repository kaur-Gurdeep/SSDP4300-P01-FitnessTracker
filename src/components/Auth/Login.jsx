import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Logged In:", formData);
  //   navigate("/user-dashboard"); // Redirect to Dashboard after login-will chnage later
  // };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    // Check if the credentials match the stored data
    if (
      storedUser && 
      storedUser.email === formData.email && 
      storedUser.password === formData.password
    ) {
      console.log("Logged In:", storedUser);
      navigate("/user-dashboard"); // Redirect to Dashboard after login
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          onChange={handleChange} 
        />
        <button type="submit" className="btn">Sign In</button>
      </form>

      <p className="switch-auth">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;



