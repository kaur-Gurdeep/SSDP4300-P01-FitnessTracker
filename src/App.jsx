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

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addExercise':
        return state; // We'll handle this in the component state instead
      case 'addWorkout':
        // Create a new workout with a proper ID and date
        const newWorkout = {
          ...action.payload,
          id: state.length + 1,
          date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        };
        return [...state, newWorkout];
      default:
        return state;
    }
  };

  // Initialize with the array directly
  const [workouts, dispatch] = useReducer(reducer, initialWorkoutData);

  return (
    <Router>
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
            element={<WorkoutHistory workouts={workouts} dispatch={dispatch} />}
          />
          <Route
            path='/workout/create'
            element={<WorkoutCreate workouts={workouts} dispatch={dispatch} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
