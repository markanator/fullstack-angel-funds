import axios from 'axios';
import TokenIntercepter from './intercepters';


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API,
  timeout: 4000,
});

instance.interceptors.request.use(TokenIntercepter.watchOutgoing, (er)=> Promise.reject(er))

export default instance;