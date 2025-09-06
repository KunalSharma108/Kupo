import React, { useState } from 'react';
import '../styles/NavDashboard.css';
import icon from '../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faTimes, faRocket, faBook } from '@fortawesome/free-solid-svg-icons';
import { closeWindow, maximizeWindow, minimizeWindow } from '@renderer/lib/ipc';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import BuildDialog from '../build/buildDialog';
import '../styles/fontFamily.css'

const NavDashboard = (): React.JSX.Element => {
  const [showBuild, setShowBuild] = useState<boolean>(false);
  const disableBuild = () => setShowBuild(false);

  return (
    <nav className="dashboard-navbar">
      {/* Left: Docs & GitHub */}
      <div className="nav-section nav-left">
        <a className="nav-link inter-font" onClick={() => alert('Sorry! Documentation is under progress...')}>
          <FontAwesomeIcon icon={faBook} /> Documentation
        </a>

        <a href="https://github.com/KunalSharma108/Kupo" target="_blank" className="nav-link github-link">
          <FontAwesomeIcon icon={faGithub} className="github-icon inter-font" />
        </a>
      </div>

      {/* Center: Logo + Text */}
      <div className="nav-section nav-center">
        <img src={icon} alt="Kupo Logo" className="dashboard-logo" />
        <span className="logo-text sour-gummy">Kupo</span>
      </div>

      {/* Right: Build + Window Buttons */}
      <div className="nav-section nav-right">
        <button className="dashboard-btn build-btn" onClick={() => setShowBuild(true)}>
          <FontAwesomeIcon icon={faRocket} /> Build
        </button>
        <div className="vertical-separator"></div>
        <div className="window-controls">
          <button onClick={() => minimizeWindow()}><FontAwesomeIcon icon={faWindowMinimize} /></button>
          <button onClick={() => maximizeWindow()}><FontAwesomeIcon icon={faWindowMaximize} /></button>
          <button onClick={() => closeWindow()} ><FontAwesomeIcon icon={faTimes} /></button>
        </div>
      </div>

      {showBuild && (
        <BuildDialog disableBuild={disableBuild} />
      )}
    </nav>
  );
};

export default NavDashboard;