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
import WorkoutSummary from './components/Workout/WorkoutSummary/WorkoutSummary';
import WorkoutCreate from './components/Workout/WorkoutCreate/WorkoutCreate';
import { initialWorkoutData } from './temp/data/workout.js';
function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addExercise':
        return {
          ...state,
          exercises: [...state.exercises, action.payload],
        };
      default:
        return state;
    }
  };

  const [workout, dispatch] = useReducer(reducer, initialWorkoutData);

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
            element={<WorkoutSummary workout={workout} dispatch={dispatch} />}
          />
          <Route
            path='/workout/create'
            element={<WorkoutCreate workout={workout} dispatch={dispatch} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
