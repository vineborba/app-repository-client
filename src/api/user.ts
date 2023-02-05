import type {
  LoginData,
  AuthResponse,
  RegisterUser,
  User,
} from '../schemas/User';

import apiClient from './client';

import { getToken } from '../utils/getToken';

export const registerUser = async (body: RegisterUser) => {
  const { data } = await apiClient.post<AuthResponse>('/users', body);
  return data;
};

export const fetchUserData = async () => {
  const { data } = await apiClient.get<User>(`/users/me`, {
    headers: { Authorization: getToken() },
  });
  return data;
};

export const login = async (body: LoginData) => {
  const { data } = await apiClient.post<AuthResponse>('/users/login', body);
  return data;
};

export const updateFavoriteProject = async (projectId: string) => {
  await apiClient.patch(
    '/users/favorite-projects',
    { projectId },
    {
      headers: { Authorization: getToken() },
    },
  );
};
