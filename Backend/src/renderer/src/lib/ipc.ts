export const sendSignUp = (data: {email: string, password: string}) => {
  window.electronAPI.SignUp(data);
};

export const sendLogIn = (data: { email: string, password: string }) => {
  window.electronAPI.LogIn(data);
};