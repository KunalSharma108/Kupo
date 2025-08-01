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
import { defaultHero } from "@renderer/interface/default sections/Hero/Hero";
import { defaultFeature } from "@renderer/interface/default sections/Feature/Feature";

interface MainDashboardProps {
  selectedProject: string | false;
}

const MainDashboard = ({ selectedProject }: MainDashboardProps): React.JSX.Element => {
  const [project, setProject] = useState<string | false>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [configData, setConfigData] = useState<any>();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [styleWarning, setStyleWarning] = useState<string | null>(null)

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
    if (configData.sectionOrders.includes(type)) {
      return setStyleWarning('You cannot add the same section twice');
    }

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
        setLoading(true);

        let newData = {
          ...configData,
          sectionOrders: [...configData.sectionOrders, 'hero'],
          sections: {
            ...configData.sections,
            hero: defaultHero,
          }
        };

        if (typeof selectedProject === 'string') {
          setConfigData(newData)
          updateConfig({ name: selectedProject, data: newData })
        } else {
          alert('Your changes could not be updated, Please try again later.')
        }

        setLoading(false)

      } else if (type.toLowerCase() === 'feature') {
        setLoading(true);

        let newData = {
          ...configData,
          sectionOrders: [...configData.sectionOrders, 'feature'],
          sections: {
            ...configData.sections,
            feature: defaultFeature,
          }
        };

        if (typeof selectedProject === 'string') {
          setConfigData(newData)
          updateConfig({ name: selectedProject, data: newData })
        } else {
          alert('Your changes could not be updated, Please try again later.')
        }

        setLoading(false)
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

  const updateData = ({ pathParts, newValue }: forUpdateData) => {
    try {
      const copyData = structuredClone(configData);
      const lastKeyIndex = pathParts.length - 1;
      const type = pathParts.length - 2;

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

      if (pathParts[type] === 'background') {

        if (pathParts[lastKeyIndex] === 'type') {

          if (newValue === 'color') {
            current.image = false;
            current.gradient = false;
            current['image + gradient'] = false;
            if (!(current.color)) current.color = false;

          } else if (newValue === 'image') {
            current.color = false;
            current.gradient = false;
            current['image + gradient'] = false;
            if (!(current.image)) current.image = false;

          } else if (newValue === 'gradient') {
            current.color = false;
            current.image = false;
            current['image + gradient'] = false;
            if (!(current.gradient)) current.gradient = false;

          } else if (newValue === 'image + gradient') {
            current.color = false;
            current.image = false;
            current.gradient = false;
            if (!(current['image + gradient'])) current['image + gradient'] = false;
          }
        }
      }

      setConfigData(copyData)

      setTimeout(async () => {
        if (typeof selectedProject === 'string') {
          const response = await updateConfig({ name: selectedProject, data: copyData });

          if (!response.done) {
            alert('Your recent change(s) could not be saved.');
          }
        }
      }, 0)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {styleWarning && (
        <div className="overlay">
          <div className="warning-modal">
            <div className="warning-heading">
              Warning!
            </div>
            <p className='warning-text'>{styleWarning}</p>
            <button onClick={() => setStyleWarning(null)}>OK</button>
          </div>
        </div>
      )}
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

                    <li onClick={() => handleComponentSelect('feature')}>
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
          <>
            {configData.sectionOrders.map((key) => {
              const sectionData = configData.sections[key];
              return (
                <div className="sections-container">
                  <RenderSection
                    type={key}
                    data={sectionData}
                    styleContent={key}
                    updateData={updateData}
                  />
                </div>
              );
            })}

            <div className="add-section-container-in-sections">

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
                      </li>

                      <li onClick={() => handleComponentSelect('hero')}>
                        <Tooltip text="The big intro area you see first, it usually contains a catchy headline, a short message, and maybe a button or image to grab attention">
                          <span>Hero</span>
                        </Tooltip>
                        { }
                      </li>

                      <li onClick={() => handleComponentSelect('feature')}>
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
          </>
        )

      ) : (
        <div className="no-project-container">
          <FontAwesomeIcon icon={faFolderOpen} className="no-project-icon" />
          <div className="no-project-content">
            <h1 className="poppins-font">NO SELECTED PROJECT!</h1>
            <p className="inter-font">
              Please create or select a project from the sidebar to continue.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainDashboard;

