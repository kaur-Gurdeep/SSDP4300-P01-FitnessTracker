import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css"; // Import the CSS module

const Login = () => {
  const [user, setUser] = useState(null);
  
    useEffect(() => {
      //check if user is stored in localStorage
      const storeUser = JSON.parse(localStorage.getItem("user"));
      if(storeUser) {
        setUser(storeUser);
      }
    }, []);

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
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      console.log("Logged In:", storedUser);
      setUser(storedUser);
      navigate("/user-dashboard"); 
      
    } else {
      alert("Invalid login credentials");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };



return (
  <div className={styles["auth-container"]}>
        {user ? (
          <>
            <h2>You are logged in</h2>
            
            <button onClick={handleLogout} className={styles["btn"]}>
              Logout
            </button>
          </>
        ) : (
        <>
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
        <button type="submit" className={styles['btn']}> 
          Sign In
        </button>
      </form>

      <p className={styles['switch-auth']}> 
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </>
    )}
  </div>
);
};

export default Login;