import React, { useReducer, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import { initialWorkoutData } from './temp/data/workout.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //check if user is stored in localStorage
    const storeUser = JSON.parse(localStorage.getItem('user'));
    if (storeUser) {
      setUser(storeUser);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

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
        <Header user={user} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/logout'
            element={<Logout handleLogout={handleLogout} />}
          />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          {user ? (
            <>
              <Route
                path='/workouts'
                element={<WorkoutHistory workouts={workouts} />}
              />
              <Route
                path='/workout/create'
                element={<WorkoutCreate dispatch={dispatch} />}
              />
              <Route path='/user-dashboard' element={<UserDashboard />} />
            </>
          ) : (
            <>
              <Route path='/workouts' element={<Navigate to='/login' />} />
              <Route
                path='/workout/create'
                element={<Navigate to='/login' />}
              />
              <Route
                path='/user-dashboard'
                element={<Navigate to='/login' />}
              />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
