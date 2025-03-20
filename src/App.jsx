<<<<<<< HEAD
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

=======
import { React, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Global styles
import Home from './components/Layout/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import About from './components/About';
import Contact from './components/Contact';
import WorkoutHistory from './components/Workout/WorkoutHistory/WorkoutHistory';
import WorkoutCreate from './components/Workout/WorkoutCreate/WorkoutCreate';
import { initialWorkoutData } from './temp/data/workout.js';
>>>>>>> master

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'cancelWorkout':
        // route to home
        return state;
      case 'addWorkout': {
        const newWorkout = {
          ...action.payload,
          id: state.length + 1,
          date: new Date().toISOString(),
        };
        return [...state, newWorkout];
      }
      default:
        return state;
    }
  };

  const [workouts, dispatch] = useReducer(reducer, initialWorkoutData);

  return (
    <Router>
<<<<<<< HEAD
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
=======
      <div className='appContainer'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/workouts'
            element={<WorkoutHistory workouts={workouts} />}
          />
          <Route
            path='/workout/create'
            element={<WorkoutCreate dispatch={dispatch} />}
          />
        </Routes>
        <Footer />
      </div>
>>>>>>> master
    </Router>
  );
}

export default App;
