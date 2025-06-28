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

  useEffect(() => {
    const FetchProjects = async () => {
      console.log("sending")
      const projects = await fetchProjects();
      console.log(projects)
      setProjects(projects);
    }

    FetchProjects()

    console.log('ntohing')

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="dashboard-container">
      <NavDashboard />
      {loading && <LoadingOverlay />}
      <div className="dashboard-body">
        <SideDashboard PassedProjects={projects} />
        <MainDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
