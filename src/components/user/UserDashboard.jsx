import React, { useEffect, useState } from 'react';
import styles from './user.module.css';  
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
    <div className={styles['user-dashboard-container']}>
        <div className={styles['info-panel']}>
                <div className={styles['left-panel']}>
                    {user && (
                        <div className={styles['user-card']}>
                            <h3>Welcome, {user.name}</h3>
                            <img src={profilePic} alt="User Avatar" className={styles['user-avatar']} />
                            <div className={styles['btns']}>
                                <button className={styles['profile-btn']}>Profile Details</button>
                                <button className={styles['logout-btn']} onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className={styles['right-panel']}>
                    <div className={styles['action-btn']}>
                        <p><strong>Make Workout</strong></p>
                        <p>Create a customized workout plan that fits your goals.</p>
                        <button>Start Now</button>
                    </div>
                    
                    <div className={styles['action-btn']}>
                        <p><strong>Track Progress</strong></p>
                        <p>Monitor your fitness journey and stay on track.</p>
                        <button>View Stats</button>
                    </div>
                    
                    <div className={styles['action-btn']}>
                        <p><strong>Explore All Exercises</strong></p>
                        <p>Discover new exercises and improve your routine.</p>
                        <button>Browse</button>
                    </div>
                </div>
        </div>

        <div className={styles['main-dashboard']}>
            <div className={styles['dashboard-sections']}>
                <div className={styles['section']}>
                    <h3>Workout Progress</h3>
                    <div className={styles['progress-circle']}>
                        <span>75%</span>
                    </div>
                </div>

                <div className={styles['section']}>
                <h3>Workout History</h3>
                <ul>
                    <li>Workout 1 - Start: 15 March 2025, End: 16 March 2025</li>
                    <li>Workout 2 - Start: 18 March 2025, End: 19 March 2025</li>
                    <li>Workout 3 - Start: 20 March 2025, End: 21 March 2025</li>
                </ul>
                </div>


                <div className={styles['section']}>
                    <h3>Calendar</h3>
                    <Calendar />
                </div>
            </div>
        </div>
    </div>
  );
};

export default UserDashboard;
