import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styles from './app.module.css';
import Home from './components/Layout/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import UserDashboard from "./components/User/UserDashboard";
import WorkoutHistory from './components/Workout/WorkoutHistory/WorkoutHistory';
import WorkoutCreate from './components/Workout/WorkoutCreate/WorkoutCreate';
import { initialWorkoutData } from './temp/data/workout.js';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //check if user is stored in localStorage
    const storeUser = JSON.parse(localStorage.getItem("user"));
    if(storeUser) {
      setUser(storeUser);
    }
  }, []);

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
    <div className={styles.appContainer}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {user ? (
                        <>
                            <Route path="/workouts" element={<WorkoutHistory workouts={workouts} />} />
                            <Route path="/workout/create" element={<WorkoutCreate dispatch={dispatch} />}/>
                        </>
                    ) : (
                        <>
                            <Route path="/workouts" element={<Navigate to="/login" />} />
                            <Route path="/workout/create" element={<Navigate to="/login" />} />
                        </>
                    )}
        {/* <Route
            path='/workouts'
            element={<WorkoutHistory workouts={workouts} />}
          />
          <Route
            path='/workout/create'
            element={<WorkoutCreate dispatch={dispatch} />}
          /> */}
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
