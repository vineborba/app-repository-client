import type { Component } from 'solid-js';
import { RiSystemDownloadCloud2Line } from 'solid-icons/ri';

interface DownloadArtifactButtonProps {
  artifactId: string;
  fileName: string;
  setIsDownloading: (state: boolean) => void;
}

const DownloadArtifactButton: Component<DownloadArtifactButtonProps> = (
  props: DownloadArtifactButtonProps,
) => {
  const downloadArtifact = async () => {
    try {
      props.setIsDownloading(true);
      // TODO? is there a better way? 🤔
      const url = `/artifacts/${props.artifactId}/download`;
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = props.fileName;
      a.click();
      props.setIsDownloading(false);
    } catch {
      props.setIsDownloading(false);
    }
  };

  return (
    <RiSystemDownloadCloud2Line
      size={24}
      class="ml-4 hover:cursor-pointer"
      onClick={downloadArtifact}
      role="button"
    />
  );
};

export default DownloadArtifactButton;
