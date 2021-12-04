import axios from  '../axios/instance';
import { foundProject, newProject, Project } from '../types';

export const getAllProjects = (params?: Record<string, any>): Promise<Project[]> => {
  return axios.get<Project[]>('/projects',{params}).then(res=>res.data);
}

export const getProjectBySlug = (slug: string): Promise<foundProject> => {
  return axios.get<foundProject>(`/projects/${slug}`).then(res=>res.data);
}

export const createNewProject = (data: Record<string, any>): Promise<newProject> => {
  return axios.post<newProject>("/projects", data).then(res=>res.data);
}