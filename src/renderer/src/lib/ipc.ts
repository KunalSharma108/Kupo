export const minimizeWindow = () => {
  return window.electronAPI.minimize();
}

export const maximizeWindow = () => {
  return window.electronAPI.maximize();
}

export const closeWindow = () => {
  return window.electronAPI.close();
}

export const fetchProjects = () => {
  return window.electronAPI.fetchProjects();
}

export const AddProject = (data: {name: string}) => {
  return window.electronAPI.AddProject(data);
}

export const renameProject = (data: {prevName: string, newName: string}) => {
  return window.electronAPI.renameProject(data);
}

export const deleteProject = (data: {name: string}) => {
  return window.electronAPI.deleteProject(data);
}

export const fetchConfig = (data: {name: string}) => {
  return window.electronAPI.fetchConfig(data)
}

export const updateConfig = (data: {name:string, data: any}) => {
  return window.electronAPI.updateConfig(data);
}

export const selectImage = () => {
  return window.electronAPI.selectImage();
}

export const selectDir = () => {
  return window.electronAPI.selectDir();
}