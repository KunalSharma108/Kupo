import { ipcMain } from "electron";
import { CheckAuth, LogIn, SignUp } from "./functions/AuthFunc";
import { mainWindow } from ".";

export const setUpIpcHandlers = async () => {
  ipcMain.handle('SignUp', async (_event, { email, password }) => {
    const response = await SignUp(email, password);
    return response;
  });

  ipcMain.handle('LogIn', async (_event, {email, password}) => {
    const response = await LogIn(email, password);
    return response;
  });

  ipcMain.handle('CheckAuth', async (_event) => {
    const response = await CheckAuth();
    return response;
  });

  ipcMain.on('window-minimize', () => {
    mainWindow?.minimize();
  });

  ipcMain.on('window-maximize', () => {
    mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize();
  });

  ipcMain.on('window-close', () => {
    mainWindow?.close();
  });

} 