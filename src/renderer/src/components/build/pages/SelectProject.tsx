import React from 'react'
import '../../styles/buildCss/project.css'

interface selectProjectProps {
  setProject: any;
  selectedProject: string;
  projects: string[];
}

function SelectProject({setProject, selectedProject, projects }: selectProjectProps): React.JSX.Element {
  return (
    <>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-option ${selectedProject === project ? 'selected' : ''}`}
            onClick={() => {
              setProject(project)
            }}
          >
            <i className="fas fa-folder"></i>
            <span>{project}</span>
          </div>
        ))}
      </div>

    </>
  )
}

export default SelectProject
