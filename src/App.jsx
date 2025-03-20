import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from './app.module.css';
import Home from './components/Layout/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import UserDashboard from "./components/User/UserDashboard";


function App() {
  
  return (
    <Router>
    <div className={styles.appContainer}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
