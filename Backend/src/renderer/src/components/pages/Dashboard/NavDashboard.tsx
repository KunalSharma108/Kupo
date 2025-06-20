import React from 'react';
import '../../styles/Dashboard.css';
import icon from '../../assets/icon.png';

const NavDashboard = (): React.JSX.Element => {
  return (
    <nav className="dashboard-navbar">
      {/* Left: Dropdowns */}
      <div className="nav-section nav-left">
        <div className="dropdown-container">
          <button className="dashboard-btn dropdown-btn">Edit ▾</button>
          <div className="dropdown-menu">
            <button className="dropdown-item">Change Font Size</button>
            <button className="dropdown-item">New Project</button>
            <button className="dropdown-item">Rename Project</button>
          </div>
        </div>

        <div className="dropdown-container">
          <button className="dashboard-btn dropdown-btn">Help ▾</button>
          <div className="dropdown-menu">
            <button className="dropdown-item">Documentation</button>
            <button className="dropdown-item">Submit Help Ticket</button>
          </div>
        </div>
      </div>

      {/* Center: Logo + Text */}
      <div className="nav-section nav-center">
        <img src={icon} alt="Kupo Logo" className="dashboard-logo" />
        <span className="logo-text sour-gummy">Kupo</span>
      </div>

      {/* Right: Action Buttons */}
      <div className="nav-section nav-right">
        <button className="dashboard-btn primary-btn">Build</button>
        <button className="dashboard-btn primary-btn">Deploy</button>
      </div>
    </nav>
  );
};

export default NavDashboard;
