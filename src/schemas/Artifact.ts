export interface Artifact {
  _id: string;
  filter: string[];
  setIsDownloading: (state: boolean) => void;
  artifacts: {
    _id: {
      $oid: string;
    };
    extension: string;
    createdAt: string;
    branch: string;
    originalFilename: string;
    identifier?: string;
    qrcode: string;
  }[];
}

export const ArtifactTypesOptions = [
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
];
