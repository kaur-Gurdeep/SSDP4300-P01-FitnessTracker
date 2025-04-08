import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.css';
import Home from './components/Layout/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import UserDashboard from './components/User/UserDashboard';
import WorkoutHistory from './components/Workout/WorkoutHistory/WorkoutHistory';
import WorkoutCreate from './components/Workout/WorkoutCreate/WorkoutCreate';
// import { v4 as uuidv4 } from 'uuid';
// import { initialWorkoutData } from './temp/data/workout.js';

function App() {
  const API_GATEWAY_URL = 'https://mqjxfg30t9.execute-api.us-west-2.amazonaws.com/test/workouts';
  const [user, setUser] = useState(null);

  useEffect(() => {
    //check if user is stored in localStorage
    const storeUser = JSON.parse(localStorage.getItem('user'));
    if (storeUser) {
      setUser(storeUser);
    }
    // fetch workouts from dynamoDB
    getAllWorkouts();
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAllWorkouts = async () => {
    try {
      const response = await fetch(API_GATEWAY_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: 'setWorkouts', payload: data });
    } catch (error) {
      console.error('Error fetching workouts:', error.message);
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setWorkouts':
        return action.payload;
      case 'resetWorkout':
        return [];
      case 'cancelWorkout':
        // route to home
        return state;
      default:
        return state;
    }
  };
  const [workouts, dispatch] = useReducer(reducer, []);

  return (
    <Router>
      <div className={styles.appContainer}>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {user ? (
            <>
              <Route path="/workouts" element={<WorkoutHistory workouts={workouts} />} />
              <Route path="/workout/create" element={<WorkoutCreate dispatch={dispatch} refreshWorkouts={getAllWorkouts} />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </>
          ) : (
            <>
              <Route path="/workouts" element={<Navigate to="/login" />} />
              <Route path="/workout/create" element={<Navigate to="/login" />} />
              <Route path="/user-dashboard" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
