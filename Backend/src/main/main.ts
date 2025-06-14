import { ipcMain } from "electron";
import { isValidEmail } from "./functions/SmallFunc";
import { supabase } from "./SupabaseClient";
import { AuthResponse } from "@supabase/supabase-js";

export const setUpIpcHandlers = async () => {
  ipcMain.handle('SignUp', async (_event, { email, password }) => {

    if (!email || !password) {
      console.log('thisihshishsihis')
      return { error: 404 }
    } else if (!isValidEmail(email)) {
      console.log('this')
      return { error: 401 }
    } else {

      try {
        console.log('this burh')
        const { data, error }: AuthResponse = await supabase.auth.signUp({ email: email.toLowerCase(), password: password }) as Awaited<ReturnType<typeof supabase.auth.signUp>>;

        if (error) {
          console.log('more like this', error)
          return { error: error }
        }

        console.log(data, error)

        return { success: true, data }
      } catch (error) {
        return { error: error }
      }
    }

  })

  ipcMain.on('LogIn', (event, data) => {
    console.log(event.ports, data)
  })
} 