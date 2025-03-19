import React from 'react';
import AccountSummary from './AccSummary';
import UserHealthSummary from './UserHealthSummary';
import './User.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <header>
        <h2>Welcome to Your Dashboard</h2>
      </header>

      <div className="dashboard-sections">
        <AccountSummary />
        <UserHealthSummary />
      </div>
    </div>
  );
};

export default UserDashboard;
