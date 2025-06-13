export const sendSignUp = (data: {email: string, password: string}) => {
  window.electronAPI.SignUp(data);
};
