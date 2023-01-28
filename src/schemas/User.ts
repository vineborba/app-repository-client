export interface User {
  name: string;
  favoriteProjects: string[];
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
