import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css"; // Import the CSS module

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Registered:", formData);
  //   navigate("/login"); // Redirect to Login after registration
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now save the registered user data
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,  // Save password as well
    };

    // Temporary use localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    console.log("Registered:", newUser);
    navigate("/login"); // Redirect to Login after registration
  };

  return (
    <div className={styles['auth-container']}> 
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          required 
          onChange={handleChange} 
        />
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
        <button type="submit" className={styles['btn']}> 
          Sign Up
        </button>
      </form>
      
      <p className={styles['switch-auth']}> 
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
