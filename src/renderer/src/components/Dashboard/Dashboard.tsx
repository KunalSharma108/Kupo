import React, { useEffect, useState } from 'react';
import SideDashboard from './SideDashboard';
import NavDashboard from './NavDashboard';
import MainDashboard from './MainDashboard';
import LoadingOverlay from '../Loading/LoadingOverlay';
import '../styles/Dashboard.css'
import { fetchProjects } from '@renderer/lib/ipc';

function Dashboard(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<string | false>(false)

  useEffect(() => {
    const FetchProjects = async () => {
      const projects = await fetchProjects();
      setProjects(projects);
    }

    FetchProjects()

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const toggleSelectedProject = (name: string | false) => {
    setSelectedProject(name)

    console.log('changing')
  }

  return (
    <div className="dashboard-container">
      <NavDashboard />
      {loading && <LoadingOverlay />}
      <div className="dashboard-body">
        <div className="side-dashboard">
          <SideDashboard PassedProjects={projects} toggleSelectedProject={toggleSelectedProject} />
        </div>

        <div className="main-dashboard">
          <MainDashboard selectedProject={selectedProject} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
