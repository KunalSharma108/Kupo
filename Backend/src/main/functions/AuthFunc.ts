import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../SupabaseClient";
import keytar from 'keytar'

const SERVICE_NAME: string = 'kupo';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function saveTokensToKeytar(access_token: string, refresh_token: string): Promise<void> {
  await keytar.setPassword(SERVICE_NAME, 'access_token', access_token);
  await keytar.setPassword(SERVICE_NAME, 'refresh_token', refresh_token);
}

async function SignUp(email: string, password: string) {
  if (!email || !password) {
    return { error: 404 }
  } else if (!isValidEmail(email)) {
    return { error: 401 }
  } else {

    try {
      const { data, error }: AuthResponse = await supabase.auth.signUp({ email: email.toLowerCase(), password: password }) as Awaited<ReturnType<typeof supabase.auth.signUp>>;

      if (error) {
        return { error: error.message }
      } else if (data) {
        if (data.session) {
          const { access_token, refresh_token } = data.session;
          await saveTokensToKeytar(access_token, refresh_token);
        }
      }
      return { success: true, data }
    } catch (error) {
      console.log(error)
      return { error: error instanceof Error ? error.message : 'unknown error' }
    }
  }
}

async function LogIn(email: string, password: string) {
  console.log('here')
  if (!email || !password) {
    return { error: 404 }
  } else if (!isValidEmail(email)) {
    return { error: 401 }
  } else {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        return { error: error.message }
      } else if (data) {
        if (data.session) {
          const { access_token, refresh_token } = data.session;
          await saveTokensToKeytar(access_token, refresh_token);
        }
      }
      
      return { success: true, data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "unknown error",
      }
    }
  }
}

export {isValidEmail, SignUp, LogIn}