import type { BaseProject } from '../schemas/Project';
import apiClient from './client';

export const fetchProjectData = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}`);
  return data;
};

export const fetchProjectImage = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}/image`);
  return data;
};

export const createProject = async (body: BaseProject) => {
  const { data } = await apiClient.post('/projects', body);
  return data;
};

export const deleteProject = async (projectId: string) => {
  await apiClient.delete(`/projects/${projectId}`);
};

export const updateProject = async (projectId: string, body: BaseProject) => {
  const { data } = await apiClient.post(`/projects/${projectId}`, body);
  return data;
};
