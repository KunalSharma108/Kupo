import React from 'react';
import SideDashboard from './SideDashboard';
import NavDashboard from './NavDashboard';
import MainDashboard from './MainDashboard';
import '../../styles/Dashboard.css'

function Dashboard(): React.JSX.Element {
  return (
    <div className="dashboard-container">
      <NavDashboard />
      <div className="dashboard-body">
        <SideDashboard />
        <MainDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
