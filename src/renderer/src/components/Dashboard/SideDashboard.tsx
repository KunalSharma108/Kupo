import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import '../styles/SideDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faGlobe, faEllipsisV, faTrash, faPen, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import Dialog from './Dialog';
import { AddProject } from '@renderer/lib/ipc';

interface SideDashboardProps {
  PassedProjects: string[];
}

const SideDashboard = ({PassedProjects}: SideDashboardProps): React.JSX.Element => {
  const [projects, setProjects] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState<number | null>(null);
  const menuRefs: MutableRefObject<(HTMLDivElement | null)[]> = useRef([]);
  const renameInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddProject = () => {
    if (!newProject.trim()) return;

    const projectExists = projects.includes(newProject.trim());
    if (projectExists) {
      alert('Project already exists!');
      setShowInput(false)
      return;
    }

    AddProject({ name: newProject });

    console.log('done');
    setProjects([newProject, ...projects]);
    setNewProject('');
    setShowInput(false);
  };
  

  const confirmDelete = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
    setShowMenu(null);
    setShowDialog(null);
  };

  const handleDelete = (index: number) => {
    setShowDialog(index);
  };

  const handleRename = (index: number) => {
    setEditingIndex(index);
    setEditedName(projects[index]);
    setShowMenu(null);
  };

  const applyRename = () => {
    if (editedName.trim() && editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = editedName;
      setProjects(updated);
      setEditingIndex(null);
      setEditedName('');
      setShowMenu(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  useEffect(() => {
    setProjects(PassedProjects)
  }, [PassedProjects])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showMenu !== null &&
        menuRefs.current[showMenu] &&
        !menuRefs.current[showMenu]!.contains(e.target as Node)
      ) {
        setShowMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    if (renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [editingIndex]);

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>Your Projects</h3>
        <button className="dashboard-btn" onClick={() => setShowInput(!showInput)} title="Add New Project">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <hr className="divider" />

      {showInput && (
        <div className="new-project-input">
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Enter project name"
            onKeyDown={(e) => handleKeyPress(e, handleAddProject)}
          />
          <button onClick={handleAddProject}>Add</button>
        </div>
      )}

      <ul className="project-list">
        {projects.length === 0 ? (
          <div className="no-projects">
            <FontAwesomeIcon icon={faFolderOpen} className="no-projects-icon" />
            <h3>No Projects</h3>
            <p>Create a new project to get started.</p>
          </div>
        ) : (
          projects.map((project, idx) => (
            <li key={idx} className="project-item">
              <FontAwesomeIcon icon={faGlobe} className="project-icon" />
              {editingIndex === idx ? (
                <input
                  ref={renameInputRef}
                  className="rename-input"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={applyRename}
                  onKeyDown={(e) => handleKeyPress(e, applyRename)}
                />
              ) : (
                <span>{project}</span>
              )}
              <div
                className="project-options"
                ref={(el: HTMLDivElement | null) => { menuRefs.current[idx] = el; }}
              >
                <button onClick={() => setShowMenu(showMenu === idx ? null : idx)} className="dots-btn">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                {showMenu === idx && (
                  <div className="fade-in-fast options-menu">
                    <button onClick={() => handleRename(idx)}><FontAwesomeIcon icon={faPen} /> Rename</button>
                    <button onClick={() => handleDelete(idx)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                  </div>
                )}
              </div>
              {showDialog === idx && (
                <Dialog
                  title="Confirm Deletion"
                  message="Are you sure you want to delete this project? It can't be restored once deleted."
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => confirmDelete(idx)}
                  onCancel={() => setShowDialog(null)}
                />
              )}
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default SideDashboard;
