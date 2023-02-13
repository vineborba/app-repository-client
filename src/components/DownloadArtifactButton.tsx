import type { Component } from 'solid-js';
import { RiSystemDownloadCloud2Line } from 'solid-icons/ri';

import { downloadArtifact } from '../api/artifact';

interface DownloadArtifactButtonProps {
  artifactId: string;
  fileName: string;
  setIsDownloading: (state: boolean) => void;
}

const DownloadArtifactButton: Component<DownloadArtifactButtonProps> = (
  props: DownloadArtifactButtonProps,
) => {
  const startDownloadArtifact = async () => {
    try {
      props.setIsDownloading(true);
      const blob = await downloadArtifact(props.artifactId);
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = props.fileName;
      a.click();
      window.URL.revokeObjectURL(a.href);
      a.remove();
      props.setIsDownloading(false);
    } catch {
      props.setIsDownloading(false);
    }
  };

  return (
    <RiSystemDownloadCloud2Line
      size={24}
      class="ml-4 hover:cursor-pointer"
      onClick={startDownloadArtifact}
      role="button"
    />
  );
};

export default DownloadArtifactButton;
