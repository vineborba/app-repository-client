import type { BaseProject, Project } from '../schemas/Project';

import { getToken } from '../utils/getToken';

import apiClient from './client';

export const fetchProjectData = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}`);
  return data;
};

export const fetchProjects = async () => {
  const { data } = await apiClient.get<Project[]>('/projects');
  return data;
};

export const fetchProjectImage = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}/image`);
  return data;
};

export const createProject = async (body: BaseProject) => {
  const { data } = await apiClient.post('/projects', body, {
    headers: { Authorization: getToken() },
  });
  return data;
};

export const deleteProject = async (projectId: string) => {
  await apiClient.delete(`/projects/${projectId}`);
};

export const updateProject = async (projectId: string, body: BaseProject) => {
  const { data } = await apiClient.patch<Project>(
    `/projects/${projectId}`,
    body,
  );
  return data;
};

export const updateProjectImage = async (projectId: string, body: FormData) => {
  await apiClient.patch(`/projects/${projectId}/image`, body);
};

export const removeProjectImage = async (projectId: string) => {
  await apiClient.delete(`/projects/${projectId}/image`);
};
