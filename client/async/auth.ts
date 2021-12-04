import axios from  '../axios/instance';

export const getLoggedInSession = () => {
  return axios.post('/auth/me');
}

export const login = (email:string, password: string) => {
  return axios.post('/auth/login', {email, password});
}

export const registerUser = (email:string, password: string, fullName: string) => {
  return axios.post('/users', {email, password, fullName});
}