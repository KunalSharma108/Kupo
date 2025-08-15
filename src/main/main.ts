import { BrowserWindow, dialog, ipcMain } from "electron";
import { mainWindow } from ".";
import { addProject, deleteProject, fetchProjects, renameProject } from "./functions/Project";
import { fetchConfig, updateConfig } from "./functions/config";
import { buildMain } from "./functions/Build/main";

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
  });

  ipcMain.handle('fetchConfig', async (_event, { name }) => {
    const response = await fetchConfig(name);
    return response;
  });

  ipcMain.handle('updateConfig', async (_event, { name, data }) => {
    const response = await updateConfig(name, data)
    return response;
  });

  ipcMain.handle('selectImage', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select an Image',
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'] }]
    });

    return result
  });

  ipcMain.handle('selectDir', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  });

  ipcMain.handle('startBuild', async (event, { project }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win !== null) {
      const result = await buildMain({ project, win })
    }
  });
}