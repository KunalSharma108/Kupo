import React, { useEffect, useState } from "react";
import LoadingOverlay from "../Loading/LoadingOverlay";
import { fetchConfig } from "@renderer/lib/ipc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import '../styles/MainDashboard.css'

interface MainDashboardProps {
  selectedProject: string | false;
}

const MainDashboard = ({ selectedProject }: MainDashboardProps): React.JSX.Element => {
  const [project, setProject] = useState<string | false>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [configData, setConfigData] = useState<any>();

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      if (selectedProject === false) {
        setProject('');
        setLoading(false);
      }

      if (typeof selectedProject === "string") {
        try {
          const response = await fetchConfig({ name: selectedProject });

          if (response.exists) {
            console.log(response)
            setConfigData(response.data);
            setTimeout(() => {
              setProject(selectedProject);
            }, 500)
          } else {
            alert('There was an error while fetching this project, Try again later.')
          }
        } catch (error) {
          setProject("");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectData();
  }, [selectedProject]);

  const handleAddSection = () => {

  }


  return (
    <div className="MainDashboard">
      {loading ? (
        <LoadingOverlay />
      ) : project === false ? (
        <h1>NO SELECTED PROJECT!</h1>
      ) : project.trim() != '' ? (
        configData.sections.sectionOrders.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faLayerGroup} className="empty-icon" />
            <h2>No sections yet</h2>
            <p>Start by adding a section to begin customizing your site.</p>
            <button onClick={handleAddSection} className="add-section-btn">
              <FontAwesomeIcon icon={faPlus} /> Add Section
            </button>
          </div>
        ) : (
          configData.sections.sectionOrders.map((key) => {
            const sectionData = configData.sections[key];
            return (
              <p>{sectionData}</p>
            );
          })
        )

      ) : (
        <h1>NO SELECTED PROJECT!</h1>
      )}
    </div>
  );
};

export default MainDashboard;
