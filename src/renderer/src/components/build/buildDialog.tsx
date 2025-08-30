import React, { useEffect, useState } from 'react'
import '../styles/buildCss/buildDialog.css'
import SelectProject from './pages/SelectProject';
import SelectDir from './pages/SelectDir';
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchProjects } from '@renderer/lib/ipc';
import '../styles/fontFamily.css'
import Build from './pages/Build';
import Done from './pages/done';

interface buildDialogProp {
  disableBuild: any;
}

function BuildDialog({ disableBuild }: buildDialogProp): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [disabling, setDisabling] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<string[]>([]);
  const [pageNextPerm, setPageNextPerm] = useState<[false | true, false | true, null]>([false, false, null]);
  const [selectedDir, setSelectedDir] = useState<string>('');
  const [building, setBuilding] = useState<boolean>(false)

  useEffect(() => {
    const FetchProjects = async () => {
      const projects = await fetchProjects();
      setProjects(projects);
    }

    FetchProjects()
  }, []);

  const setProject = (project: string) => {
    setSelectedProject(project)
    setPageNextPerm((prev) => {
      let updated = prev
      updated[page] = true

      return updated
    });
  }

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

  const changeDir = (dir: string) => {
    setSelectedDir(dir);
    setPageNextPerm((prev) => {
      let updated = prev
      updated[page] = true

      return updated
    });
  }

  const pages = [
    <SelectProject setProject={setProject} selectedProject={String(selectedProject)} projects={projects} />,
    <SelectDir selectedDir={selectedDir} changeDir={changeDir} />,
    <Build project={selectedProject} directory={selectedDir} goNext={goNext} />,
    <Done />
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

  const openDirectory = () => {

  }

  const handleClose = () => {
    disableBuild();
  }

  // ! SOLVE THE BUTTONS ALIGNING ISSUE ON COMPLETE PAGE AND ALSO SET THE OPEN DIRECTORY THINGGGG

  return (
    <>
      <div className={`build-overlay ${disabling ? "fade-out" : "fade-in"}`}></div>

      <div className={`build-dialog fade-in ${disabling ? "fade-out" : ""}`}>
        <div className="dialog-heading">
          Build a project!
        </div>
        <div className="page-container">
          {prevPage !== null && (
            <div
              className={`dialog-page ${direction === "next" ? "slide-out-left" : "slide-out-right"}`}
              style={{ position: "absolute" }}
            >
              {pages[prevPage]}
            </div>
          )}

          <div
            className={`dialog-page active ${direction === "next" ? "slide-in-right" : "slide-in-left"}`}
            style={{ position: "relative" }}
          >
            {pages[page]}
          </div>
        </div>

        <div className="dialog-footer">
          {pages.length - 1 !== page ? (
            <button className="cancel-btn inter-font" onClick={callDisable}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          ) : (
            <div></div>
          )}

          <div className="nav-buttons">
            {pages.length - 1 !== page ? (
              <>
                <button onClick={goPrev} disabled={page === 0 || page === 2 || building} className=' inter-font'>
                  <FontAwesomeIcon icon={faArrowLeft} /> Previous
                </button>

                <button onClick={goNext} disabled={page === pages.length - 1 || !pageNextPerm[page] || building} className=' inter-font'>
                  {
                    page === 1 ? 'Start Building' : page === 2 ? 'Close' : 'Next'
                  }
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </>

            ) : (
              <>
                <button onClick={openDirectory} className=' inter-font'>
                  <FontAwesomeIcon icon={faArrowLeft} className='icon-rotate' /> Open Folder
                </button>

                <button onClick={handleClose} className=' inter-font'>
                  Continue
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BuildDialog