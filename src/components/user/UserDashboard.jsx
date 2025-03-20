import React, { useEffect, useState } from 'react';
import './User.css';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import profilePic from '../../assets/placeholder.png';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="user-dashboard-container">
        <div class="info-panel">
                <div className="left-panel">
                    {user && (
                        <div className="user-card">
                            <h3>Welcome, {user.name}</h3>
                            <img src={profilePic} alt="User Avatar" className="user-avatar" />
                            <div class="btns">
                            <button className="profile-btn">Profile Details</button>
                            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                        )}
                </div>
                
                <div className="right-panel">
                    <div className="action-btn">
                        <p><strong>Make Workout</strong></p>
                        <p>Create a customized workout plan that fits your goals.</p>
                        <button>Start Now</button>
                    </div>
                    
                    <div className="action-btn">
                        <p><strong>Track Progress</strong></p>
                        <p>Monitor your fitness journey and stay on track.</p>
                        <button>View Stats</button>
                    </div>
                    
                    <div className="action-btn">
                        <p><strong>Explore All Exercises</strong></p>
                        <p>Discover new exercises and improve your routine.</p>
                        <button>Browse</button>
                    </div>
                </div>
        </div>

        <div className="main-dashboard">
            <div className="dashboard-sections">
            <div className="section">
                <h3>Workout Progress</h3>
                <div className="progress-circle">
                <span>75%</span>
                </div>
            </div>

            <div className="section">
                <h3>Workout History</h3>
                <ul>
                <li>Workout 1 - 15 March 2025</li>
                <li>Workout 2 - 18 March 2025</li>
                <li>Workout 3 - 20 March 2025</li>
                </ul>
            </div>

            <div className="section">
                <h3>Calendar</h3>
                <Calendar />
            </div>
            </div>
        </div>
    </div>
  );
};

export default UserDashboard;
