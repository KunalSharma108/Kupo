import { ipcMain } from "electron";
import { mainWindow } from ".";
import { addProject, deleteProject, fetchProjects, renameProject } from "./functions/Project";
import { fetchConfig } from "./functions/config";

export const setUpIpcHandlers = async () => {
  ipcMain.on('window-minimize', () => {
    mainWindow?.minimize();
  });

  ipcMain.on('window-maximize', () => {
    mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize();
  });

  ipcMain.on('window-close', () => {
    mainWindow?.close();
  });

  ipcMain.handle('fetchProjects', async (_event) => {
    const reponse = await fetchProjects();
    return reponse;
  });

  ipcMain.handle('AddProject', async (_event, { name }) => {
    const response = await addProject(name);
    return response;
  });

  ipcMain.handle('renameProject', async (_event, { prevName, newName }) => {
    const response = await renameProject(prevName, newName);
    return response;
  });

  ipcMain.handle('deleteProject', async (_event, { name }) => {
    const response = await deleteProject(name);
    return response;
  })

  ipcMain.handle('fetchConfig', async (_event, {name}) => {
    const response = await fetchConfig(name);
    return response;
  })
} 