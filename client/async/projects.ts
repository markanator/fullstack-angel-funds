import axios from  '../axios/instance';
import { foundProject, Project } from '../types';

export const getAllProjects = (): Promise<Project[]> => {
  return axios.get<Project[]>('/projects').then(res=>res.data);
}

export const getProjectBySlug = (slug: string): Promise<foundProject> => {
  return axios.get<foundProject>(`/projects/${slug}`).then(res=>res.data);
}