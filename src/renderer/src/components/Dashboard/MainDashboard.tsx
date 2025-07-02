import React, { useEffect, useRef, useState } from "react";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const handleAddSection = (type: string) => {
    console.log(type)
  }


  const handleAddClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleComponentSelect = (type) => {
    setShowDropdown(false); 
    handleAddSection(type); 
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>

      {loading ? (
        <LoadingOverlay />
      ) : project === false ? (
        <h1>NO SELECTED PROJECT!</h1>
      ) : project.trim() != '' ? (
        configData.sections.sectionOrders.length === 0 ? (
          <div className={`empty-state ${showDropdown ? 'with-dropdown' : ''}`}>

            <FontAwesomeIcon icon={faLayerGroup} className="empty-icon" />
            <h2>No sections yet</h2>
            <p>Start by adding a section to begin customizing your site.</p>

            <button onClick={handleAddClick} className="add-section-btn">
              <FontAwesomeIcon icon={faPlus} /> Add Section
            </button>

            {showDropdown && (
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <div className="component-dropdown fade-in">
                  <div className="dropdown-header">Choose a section to add</div>
                  <ul className="dropdown-list">
                    <li onClick={() => handleComponentSelect('navbar')}>
                      <span>Navbar</span>
                      <span className="badge raleway">Recommended</span>
                    </li>
                    <li onClick={() => handleComponentSelect('hero')}>Hero</li>
                    <li onClick={() => handleComponentSelect('features')}>Features</li>
                    <li onClick={() => handleComponentSelect('timeline')}>Timeline</li>
                  </ul>
                </div>
              </div>
            )}
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
    </>
  );
};

export default MainDashboard;
