export interface Artifact {
  id: string;
  filter: string[];
  setIsDownloading: (state: boolean) => void;
  artifacts: {
    id: string;
    type: string;
    createdAt: string;
    branch: string;
    originalFilename: string;
    identifier?: string;
    qrcode: string;
  }[];
}

export const ArtifactTypesOptions =  [
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
]