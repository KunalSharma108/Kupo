import React from 'react';
import '../../styles/Dashboard.css';

const SideDashboard = (): React.JSX.Element => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>Your Projects</h3>
        <button className="dashboard-btn">+ New Project</button>
      </div>
      <ul className="project-list">
        <li className="project-item">Portfolio v1</li>
        <li className="project-item">Blog Site</li>
        <li className="project-item">Ecom Template</li>
      </ul>
    </aside>
  );
};

export default SideDashboard;