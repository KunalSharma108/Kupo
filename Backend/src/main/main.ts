import { ipcMain } from "electron";
// import { supabase } from "./SupabaseClient";

export const setUpIpcHandlers = () => {
  ipcMain.on('SignUp', (event, data) => {
    console.log(event.ports, data)
  })

  ipcMain.on('LogIn', (event, data) => {
    console.log(event.ports, data)
  })

} 