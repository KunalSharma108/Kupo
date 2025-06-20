export const sendSignUp = (data: {email: string, password: string}) => {
  return window.electronAPI.SignUp(data);
};

export const sendLogIn = (data: { email: string, password: string }) => {
  return window.electronAPI.LogIn(data);
};

export const CheckAuth = () => {
  return window.electronAPI.CheckAuth();
}

export const minimizeWindow = () => {
  return window.electronAPI.minimize();
}

export const maximizeWindow = () => {
  return window.electronAPI.maximize();
}

export const closeWindow = () => {
  return window.electronAPI.close();
}