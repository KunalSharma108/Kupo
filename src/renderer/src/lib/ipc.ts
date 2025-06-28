export const minimizeWindow = () => {
  return window.electronAPI.minimize();
}

export const maximizeWindow = () => {
  return window.electronAPI.maximize();
}

export const closeWindow = () => {
  return window.electronAPI.close();
}

export const AddProject = (data: {name: string}) => {
  return window.electronAPI.AddProject(data);
}

export const fetchProjects = () => {
  return window.electronAPI.fetchProjects();
}