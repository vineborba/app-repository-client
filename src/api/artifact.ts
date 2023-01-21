import apiClient from './client';

export const fetchArtifacts = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}/artifacts`);
  return data;
};
