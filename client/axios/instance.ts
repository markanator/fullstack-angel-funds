import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API,
  timeout: 4000,
});


export default instance;