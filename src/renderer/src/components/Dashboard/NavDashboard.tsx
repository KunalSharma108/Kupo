import React from 'react';
import '../styles/NavDashboard.css';
import icon from '../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faTimes, faRocket, faBook } from '@fortawesome/free-solid-svg-icons';
import { closeWindow, maximizeWindow, minimizeWindow } from '@renderer/lib/ipc';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const NavDashboard = (): React.JSX.Element => {
  return (
    <nav className="dashboard-navbar">
      {/* Left: Docs & GitHub */}
      <div className="nav-section nav-left">
        <a href="https://yourdocslink.com" target="_blank" className="nav-link">
          <FontAwesomeIcon icon={faBook} /> Documentation
        </a>

        <a href="https://github.com/KunalSharma108/Kupo" target="_blank" className="nav-link github-link">
          <FontAwesomeIcon icon={faGithub} className="github-icon" />
          <span className="github-stars">1</span>
        </a>
      </div>

      {/* Center: Logo + Text */}
      <div className="nav-section nav-center">
        <img src={icon} alt="Kupo Logo" className="dashboard-logo" />
        <span className="logo-text sour-gummy">Kupo</span>
      </div>

      {/* Right: Build + Window Buttons */}
      <div className="nav-section nav-right">
        <button className="dashboard-btn build-btn">
          <FontAwesomeIcon icon={faRocket} /> Build
        </button>
        <div className="vertical-separator"></div>
        <div className="window-controls">
          <button onClick={() => minimizeWindow()}><FontAwesomeIcon icon={faWindowMinimize} /></button>
          <button onClick={() => maximizeWindow()}><FontAwesomeIcon icon={faWindowMaximize} /></button>
          <button onClick={() => closeWindow()} ><FontAwesomeIcon icon={faTimes} /></button>
        </div>
      </div>
    </nav>
  );
};

export default NavDashboard;