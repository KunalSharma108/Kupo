import React from 'react';
import '../../styles/Dashboard.css';

const NavDashboard = (): React.JSX.Element => {
  return (
    <nav className="dashboard-navbar">
      <div className="nav-left">CMS Dashboard</div>
      <div className="nav-right">
        <button className="dashboard-btn">Build</button>
        <button className="dashboard-btn">Deploy</button>
        <button className="dashboard-btn">Help</button>
        <button className="dashboard-btn">Edit</button>
      </div>
    </nav>
  );
};

export default NavDashboard;