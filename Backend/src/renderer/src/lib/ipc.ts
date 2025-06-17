export const sendSignUp = (data: {email: string, password: string}) => {
  return window.electronAPI.SignUp(data);
};

export const sendLogIn = (data: { email: string, password: string }) => {
  return window.electronAPI.LogIn(data);
};

export const CheckAuth = (data: any) => {
  return window.electronAPI.CheckAuth(data);
}