import { ipcMain } from "electron";
import { CheckAuth, LogIn, SignUp } from "./functions/AuthFunc";

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
  })
} 