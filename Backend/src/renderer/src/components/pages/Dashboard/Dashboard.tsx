import React from 'react';
import DashSidebar from './SideDashboard';
import NavDashboard from './NavDashboard';
import MainDashboard from './MainDashboard';

function Dashboard(): React.JSX.Element {
  return (
    <div className="dashboard-container">
      <NavDashboard />
      <div className="dashboard-body">
        <DashSidebar />
        <MainDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
