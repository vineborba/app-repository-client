export interface Project {
  name: string;
  description: string;
  platforms: string[];
  _id: { '$oid': string };
  key: string;
  image?: string;
}

export interface BaseProject {
  name: string;
  description: string;
  platforms: string[];
}
