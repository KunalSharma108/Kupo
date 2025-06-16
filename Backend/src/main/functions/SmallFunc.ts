import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../SupabaseClient";

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function SignUp(email: string, password:string) {
  if (!email || !password) {
    return { error: 404 }
  } else if (!isValidEmail(email)) {
    return { error: 401 }
  } else {

    try {
      const { data, error }: AuthResponse = await supabase.auth.signUp({ email: email.toLowerCase(), password: password }) as Awaited<ReturnType<typeof supabase.auth.signUp>>;

      if (error) {
        return { error: error.message }
      }
      console.log(data, error)
      return { success: true, data }
    } catch (error) {
      console.log(error)
      return { error: error instanceof Error ? error.message : 'unknown error' }
    }
  }
}