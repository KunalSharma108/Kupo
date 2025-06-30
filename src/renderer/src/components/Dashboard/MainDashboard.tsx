import React, { useEffect, useState } from "react";
import LoadingOverlay from "../Loading/LoadingOverlay";
import { fetchConfig } from "@renderer/lib/ipc";

interface MainDashboardProps {
  selectedProject: string;
}

const MainDashboard = ({ selectedProject }: MainDashboardProps): React.JSX.Element => {
  const [project, setProject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [configData, setConfigData] = useState<any>();

  useEffect(() => {
    if (!selectedProject) return;

    const fetchProjectData = async () => {
      setLoading(true);

      try {
        const response = await fetchConfig({ name: selectedProject });

        if (response.exists) {
          setConfigData(response.data);
          setProject(selectedProject);
        } else {
          alert('There was an error while fetching this project, Try again later.')
        }
      } catch (error) {
        setProject("");
      } finally {
        setLoading(false);
        console.log(configData);
      }
    };

    fetchProjectData();
  }, [selectedProject]);

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : project ? (
        <p>Selected project is {project}</p>
      ) : (
        <h1>NO SELECTED PROJECT!</h1>
      )}
    </>
  );
};

export default MainDashboard;
