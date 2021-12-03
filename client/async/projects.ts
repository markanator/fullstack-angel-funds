import axios from  '../axios/instance';
import { Project } from '../types';

export const getAllProjects = (): Promise<Project[]> => {
  return axios.get<Project[]>('/projects').then(res=>res.data);
}