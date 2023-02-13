import apiClient from './client';

export const fetchArtifacts = async (projectId: string) => {
  const { data } = await apiClient.get(`/projects/${projectId}/artifacts`);
  return data;
};

export const downloadArtifact = async (artifactId: string) => {
  const { data } = await apiClient.get(`/artifacts/${artifactId}/download`, {
    responseType: 'blob',
  });
  return data;
};
