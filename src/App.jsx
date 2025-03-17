import React from 'react';
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

function App() {
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
          <Route path='/workouts' element={<WorkoutSummary />} />
          <Route path='/workout/create' element={<WorkoutCreate />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
