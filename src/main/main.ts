import { ipcMain } from "electron";
import { mainWindow } from ".";
import { addProject, fetchProjects } from "./functions/Project";

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

  ipcMain.handle('AddProject', async (_event, {name}) => {
    const response = await addProject(name);
    return response;
  })

  ipcMain.handle('fetchProjects', async(_event) => {
    const reponse = await fetchProjects();
    return reponse;
  })
} 