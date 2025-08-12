import React from 'react'
import '../../styles/buildCss/project.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faExclamationCircle, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import '../../styles/fontFamily.css'

interface selectProjectProps {
  setProject: any;
  selectedProject: string;
  projects: string[];
}

function SelectProject({ setProject, selectedProject, projects }: selectProjectProps): React.JSX.Element {
  return (
    <div className='project-select-wrapper'>
      <h2 className="projects-heading">
        <FontAwesomeIcon icon={faCogs} /> Select the project you want to build
      </h2>

      <div className="projects-list">
        {projects.length > 0 ? (
          projects.map((project, idx) => (
            <div
              key={idx}
              className={`quicksand-font project-option ${selectedProject === project ? "selected" : ""}`}
              onClick={() => setProject(project)}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>{project}</span>
            </div>
          ))
        ) : (
          <div className="no-projects">
            <FontAwesomeIcon icon={faExclamationCircle} /> No projects found
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectProject
