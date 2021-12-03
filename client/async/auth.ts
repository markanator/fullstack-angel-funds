import axios from  '../axios/instance';

export const getLoggedInSession = () => {
  return axios.post('/auth/me');
}