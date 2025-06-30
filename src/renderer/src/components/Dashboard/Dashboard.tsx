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
  const [selectedProject, setSelectedProject] = useState<string>('')

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

  const toggleSelectedProject = (name: string) => {
    setSelectedProject(name)
  }

  return (
    <div className="dashboard-container">
      <NavDashboard />
      {loading && <LoadingOverlay />}
      <div className="dashboard-body">
        <SideDashboard PassedProjects={projects} toggleSelectedProject={toggleSelectedProject} />
        <MainDashboard selectedProject={selectedProject}/>
      </div>
    </div>
  );
}

export default Dashboard;
