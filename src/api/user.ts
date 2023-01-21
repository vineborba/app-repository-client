import apiClient from './client';

import { LoginData, RegisterUser } from '../schemas/User';

export const registerUser = async (body: RegisterUser) => {
  const { data } = await apiClient.post('/users', body);
  return data;
};

export const fetchUserData = async (userId: string) => {
  const { data } = await apiClient.get(`/users/${userId}`);
  return data;
};

export const login = async (body: LoginData) => {
  const { data } = await apiClient.post('/users/login', body);
  return data;
}
