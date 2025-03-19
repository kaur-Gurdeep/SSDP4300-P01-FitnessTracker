//delete
//edit
import React from 'react';

const AccSummary = ({ user }) => {
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        plan: 'Premium',
      };
    
      return (
        <div className="account-summary">
          <h3>Account Summary</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Plan:</strong> {userData.plan}</p>
        </div>
      );
    };

export default AccSummary;
