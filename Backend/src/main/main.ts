import { ipcMain } from "electron";
import SignUp from "./functions/SmallFunc";

export const setUpIpcHandlers = async () => {
  ipcMain.handle('SignUp', async (_event, { email, password }) => {
    const response = await SignUp(email, password);
    return response;
  })

  ipcMain.on('LogIn', (event, data) => {
    console.log(event.ports, data)
  })
} 