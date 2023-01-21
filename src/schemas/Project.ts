export interface Project {
  name: string;
  description: string;
  platforms: string[];
  id: string;
  key: string;
  image?: string;
}

export interface BaseProject {
  name: string;
  description: string;
  platforms: string[];
}
