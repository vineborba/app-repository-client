import type { Component, JSX } from 'solid-js';
import {
  Accessor,
  onMount,
  createContext,
  createSignal,
  useContext,
} from 'solid-js';

import { LoginData, RegisterUser, User } from '../schemas/User';

import {
  fetchUserData,
  login,
  registerUser,
  updateFavoriteProject,
} from '../api/user';

interface IUserContext {
  user: Accessor<User>;
  signIn: (data: LoginData) => Promise<void>;
  signUp: (data: RegisterUser) => Promise<void>;
  signOut: () => void;
  updateFavoriteProjects: (projectId: string) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  signIn: async () => {
    return;
  },
  signUp: async () => {
    return;
  },
  signOut: () => {
    return;
  },
  updateFavoriteProjects: async () => {
    return;
  },
});

export const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [user, setUser] = createSignal<User>(null);

  onMount(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const userData = await fetchUserData();
    setUser(userData);
  });

  const signIn = async (data: LoginData) => {
    try {
      const { token } = await login(data);
      localStorage.setItem('token', token);
      const userData = await fetchUserData();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  };

  const signUp = async (data: RegisterUser) => {
    try {
      const { token } = await registerUser(data);
      localStorage.setItem('token', token);
      const userData = await fetchUserData();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateFavoriteProjects = async (projectId: string) => {
    await updateFavoriteProject(projectId);
    const userData = await fetchUserData();
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{ user, signIn, signUp, signOut, updateFavoriteProjects }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
