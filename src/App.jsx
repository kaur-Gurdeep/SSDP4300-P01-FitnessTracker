import { React, useReducer, useEffect } from 'react';
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

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'cancelWorkout':
        // route to home
        return state;
      case 'setWorkouts': // ADDED BY MARC
        return action.payload;
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

  // MARC INSERT ============
  // import { initialWorkoutData } from './temp/data/workout.js';
  const [workouts, dispatch] = useReducer(reducer, []);
  const userId = 1;
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workouts/${userId}`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'setWorkouts', payload: data });
      } catch (error) {
        console.error('Error fetching workouts', error.message);
      }
    };
    fetchWorkouts();
  }, []);
  
  // MARC INSERT ============

  return (
    <Router>
      <div className="appContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workouts" element={<WorkoutHistory workouts={workouts} />} />
          <Route path="/workout/create" element={<WorkoutCreate dispatch={dispatch} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
