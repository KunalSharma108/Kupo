import { selectDir } from '@renderer/lib/ipc';
import React from 'react';
import '../../styles/buildCss/directory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface SelectDirProps {
  selectedDir: string;
  changeDir: (dir: string) => void;
}

function SelectDir({ selectedDir, changeDir }: SelectDirProps): React.JSX.Element {
  const handleSelectFolder = async () => {
    const dir = await selectDir();
    if (dir) changeDir(dir);
  };

  return (
    <div className="select-dir-container">
      <FontAwesomeIcon icon={faFolderOpen} className="folder-icon" />
      <h2 className="mullish-font project-heading">
        Select the folder you want this project to be built in.
      </h2>

      <button className="dmSans-font select-dir-btn" onClick={handleSelectFolder}>
        <FontAwesomeIcon icon={faFolder} style={{ marginRight: "8px" }} />
        {selectedDir.trim() !== '' ? 'Change Folder' : 'Choose Folder'}
      </button>

      {selectedDir && (
        <div className="quicksand-font selected-dir-box">
          <FontAwesomeIcon icon={faFolder} className="selected-dir-icon" />
          <span className="selected-dir-text">{selectedDir}</span>
        </div>
      )}
    </div>
  );
}
export default SelectDir;