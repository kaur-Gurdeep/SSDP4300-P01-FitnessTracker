import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css'; // Import the CSS module

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      onLogin(storedUser);
      navigate('/user-dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className={styles['auth-container']}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={handleChange}
        />
        <button type='submit' className={styles['btn']}>
          Sign In
        </button>
      </form>

      <p className={styles['switch-auth']}>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
