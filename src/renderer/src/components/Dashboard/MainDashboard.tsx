import React, { useEffect, useRef, useState } from "react";
import LoadingOverlay from "../Loading/LoadingOverlay";
import { fetchConfig, updateConfig } from "@renderer/lib/ipc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import '../styles/MainDashboard.css'
import RenderSection from "./components/RenderSection";
import Tooltip from "./components/CustomTooltip";
import { defaultNavbar } from "@renderer/interface/default sections/Navbar/Navbar";
import '../styles/render.css'

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
    try {
      if (type.toLowerCase() === 'navbar') {
        setLoading(true);

        let newData = {
          ...configData,
          sectionOrders: [...configData.sectionOrders, 'navbar'],
          sections: {
            ...configData.sections,
            navbar: defaultNavbar,
          }
        };

        if (typeof selectedProject === 'string') {
          setConfigData(newData)
          updateConfig({ name: selectedProject, data: newData })
        } else {
          alert('Your changes could not be updated, Please try again later.')
        }

        setLoading(false)

      } else if (type.toLowerCase() === 'hero') {

      } else if (type.toLowerCase() === 'feature') {

      } else if (type.toLowerCase() === 'timeline') {

      } else {
        return
      }
    } catch (error) {
      alert('Something went wrong! Please try again later.');
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleComponentSelect = (type: string) => {
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

  interface forUpdateData {
    pathParts: [stlyeContent: string, styleContentType: string, styleType: string, type: string, subType: string];
    newValue: any;
  }

  const updateData = ({pathParts, newValue}: forUpdateData) => {
    console.log(pathParts, newValue)

    const copyData = structuredClone(configData);
    const lastKeyIndex = pathParts.length - 1;

    let current = copyData;

    for (let i = 0; i < lastKeyIndex; i++) {
      let currentKey = current[pathParts[i]];
      if (!currentKey) {
        alert('There was an error while updating your changes.')
        return;
      }
      current = currentKey;
    }

    current[pathParts[lastKeyIndex]] = newValue;

    setConfigData(copyData)

    setTimeout(async () => {
      if (typeof selectedProject === 'string') {
        const response = await updateConfig({name: selectedProject, data: copyData});

        if (!response.done) {
          alert('Your recent change(s) could not be saved.');
        }
      }
    }, 0)
  }

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : project === false ? (
          <div className="no-project-container">
            <FontAwesomeIcon icon={faFolderOpen} className="no-project-icon" />
            <h2>No Project Selected</h2>
            <p>Please select or create a project to get started.</p>
          </div>
      ) : project.trim() != '' ? (
        configData.sectionOrders.length === 0 ? (
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
                      <Tooltip text="A menu bar at the top of the site that helps visitors navigate between different pages or sections">
                        <span>Navbar</span>
                      </Tooltip>
                      <span className="badge raleway">Recommended</span>
                    </li>

                    <li onClick={() => handleComponentSelect('hero')}>
                      <Tooltip text="The big intro area you see first, it usually contains a catchy headline, a short message, and maybe a button or image to grab attention">
                        <span>Hero</span>
                      </Tooltip>
                    </li>

                    <li onClick={() => handleComponentSelect('features')}>
                      <Tooltip text="A section that shows what you offer, with each feature explained using an image and a short message — the layout switches sides as you scroll to keep it visually engaging.">
                        <span>Features</span>
                      </Tooltip>
                    </li>

                    <li onClick={() => handleComponentSelect('timeline')}>
                      <Tooltip text="A vertical list that shows your journey or progress over time — like milestones, work history, or project phases, in the order they happened.">
                        <span>Timeline</span>
                      </Tooltip>
                    </li>
                  </ul>

                </div>
              </div>
            )}
          </div>

        ) : (
          configData.sectionOrders.map((key) => {
            const sectionData = configData.sections[key];
            return (
              <div className="sections-container">
                <RenderSection type={key} data={sectionData} styleContent={key} updateData={updateData} />
              </div>
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

