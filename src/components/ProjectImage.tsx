import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { RiSystemDeleteBin2Fill } from 'solid-icons/ri';

import { removeProjectImage, updateProjectImage } from '../api/project';

import { Project } from '../schemas/Project';

interface ProjectImageProps {
  image?: string;
  projectId: string;
  refetchProject: () => Project | Promise<Project>;
}

const ProjectImage: Component<ProjectImageProps> = (props) => {
  const handleImageUpload = async (e: OnChangeInputEvent) => {
    try {
      const file = e.currentTarget.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('file', e.currentTarget.files[0]);
      await updateProjectImage(props.projectId, formData);
      await props.refetchProject();
    } catch (error) {
      // TODO: error handling
      console.log('error', error);
    }
  };

  const handleDeleteImage = async () => {
    await removeProjectImage(props.projectId);
    await props.refetchProject();
  };

  return (
    <form class="relative h-40 w-40">
      <input
        hidden
        type="file"
        accept="image/png, image/jpeg"
        id="image-upload"
        onChange={handleImageUpload}
      />
      <label
        for="image-upload"
        class={`
        h-40 w-40
        rounded-lg
        text-center
        px-4
        flex justify-center items-center
        absolute top-0
        ${props.image ? 'bg-slate-200' : 'bg-emerald-300'}
        ${props.image ? 'opacity-0' : 'hover:opacity-70'}
        hover:cursor-pointer
        `}
      >
        Upload a picture to the project
      </label>
      <Show when={props.image}>
        <button
          onClick={handleDeleteImage}
          type="button"
          class="h-8 w-8 bg-white rounded-full absolute top-1 right-1 z-10 flex justify-center items-center"
        >
          <RiSystemDeleteBin2Fill size={20} class="fill-rose-600" />
        </button>
        <img
          alt="Logo do projeto"
          src={props.image}
          class="rounded-lg"
          height={160}
          width={160}
        />
      </Show>
    </form>
  );
};

export default ProjectImage;
