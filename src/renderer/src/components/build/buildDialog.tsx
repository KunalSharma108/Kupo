import React, { useEffect, useState } from 'react'
import '../styles/buildCss/build.css'
import SelectProject from './pages/SelectProject';
import SelectDir from './pages/SelectDir';
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchProjects } from '@renderer/lib/ipc';
import '../styles/fontFamily.css'

interface buildDialogProp {
  disableBuild: any;
}

function BuildDialog({ disableBuild }: buildDialogProp): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [disabling, setDisabling] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<string[]>([])

  useEffect(() => {
    const FetchProjects = async () => {
      const projects = await fetchProjects();
      setProjects(projects);
    }

    FetchProjects()
  }, []);

  const setProject = (project: string) => setSelectedProject(project)

  const changePage = (newPage: number) => {
    setPrevPage(page);
    setPage(newPage);
  };

  const goNext = () => {
    if (page < pages.length - 1) {
      setDirection("next");
      changePage(page + 1);
    }
  };

  const pages = [
    <SelectProject setProject={setProject} selectedProject={String(selectedProject)} projects={projects} />,
    <SelectDir triggerNext={goNext} />
  ];

  const goPrev = () => {
    if (page > 0) {
      setDirection("prev");
      changePage(page - 1);
    }
  };

  const callDisable = () => {
    setDisabling(true);
    setTimeout(() => {
      disableBuild()
    }, 500)
  }

  return (
    <>
      <div className={`overlay ${disabling ? "fade-out" : "fade-in"}`}></div>

      <div className={`dialog fade-in ${disabling ? "fade-out" : ""}`}>
        <div className="page-heading">
          Build a project!
        </div>
        <div className="page-container">
          {prevPage !== null && (
            <div
              key={`prev-${prevPage}`}
              className={`dialog-page ${direction === "next" ? "slide-out-left" : "slide-out-right"}`}
            >
              {pages[prevPage]}
            </div>
          )}

          <div
            key={`current-${page}`}
            className={`dialog-page ${direction === "next" ? "slide-in-right" : direction === "prev" ? "slide-in-left" : ""}`}
          >
            {pages[page]}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="dialog-footer">
          <button className="cancel-btn inter-font" onClick={callDisable}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>

          <div className="nav-buttons">
            <button onClick={goPrev} disabled={page === 0} className=' inter-font'>
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
            <button onClick={goNext} disabled={page === pages.length - 1}  className=' inter-font'>
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuildDialog