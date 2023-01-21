import type { Component } from 'solid-js';
import { For, Show, createResource, createSignal } from 'solid-js';
import type { Params } from '@solidjs/router';
import { useNavigate, useParams } from '@solidjs/router';
import { RiSystemArrowLeftLine, RiSystemDeleteBin2Fill } from 'solid-icons/ri';

import type { Project } from '../schemas/Project';

import Checkbox from '../components/Checkbox';
import { fetchProjectData, fetchProjectImage } from '../api/project';
import FavoriteButton from '../components/FavoriteButton';
import EditProjectModal from '../components/EditProjectModal';
import DeleteProjectModal from '../components/DeleteProjectModal';
import { ArtifactTypesOptions } from '../schemas/Artifact';
import ProjectArtifactList from '../components/ProjectArtifactList';

interface PageParams extends Params {
  projectId: string;
}

const ProjectDetails: Component = () => {
  const params = useParams<PageParams>();
  const navigate = useNavigate();

  const [types, setTypes] = createSignal(['ios', 'android']);
  const [isDownloading, setIsDownloading] = createSignal(false);

  const [project] = createResource<Project, string>(
    () => params.projectId,
    fetchProjectData,
  );

  const [image] = createResource<string, string>(
    () => params.projectId,
    fetchProjectImage,
  );

  const isFavorite = Math.random() > 0.4;

  const handleDeleteImage = async () => {
    //TODO
  };

  const toggleFavorite = async () => {
    //TODO
  };

  const handleImageUpload = async () => {
    //TODO
  };

  const handleCheckboxClick = (type: string) => {
    if (types().includes(type)) {
      setTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setTypes((prev) => [...prev, type]);
    }
  };

  const renderImage = () => {
    const bgColor = image ? 'bg-slate-200' : 'bg-emerald-300';
    const opacity = image ? 'opacity-0' : 'hover:opacity-70';

    return (
      <form class="relative h-40 w-40">
        <input
          hidden
          type="file"
          accept="image/*"
          id="image-upload"
          onChange={handleImageUpload}
        />
        <label
          for="image-upload"
          class={`h-40 w-40 rounded-lg text-center px-4 flex justify-center items-center absolute top-0 ${opacity} ${bgColor} hover:cursor-pointer`}
        >
          Upload a picture to the project
        </label>
        <Show when={image()}>
          <button
            onClick={handleDeleteImage}
            type="button"
            class="h-8 w-8 bg-white rounded-full absolute top-1 right-1 z-10 flex justify-center items-center"
          >
            <RiSystemDeleteBin2Fill size={20} class="fill-rose-600" />
          </button>
          <img
            alt="Logo do projeto"
            src={image()}
            class="rounded-lg"
            height={160}
            width={160}
          />
        </Show>
      </form>
    );
  };

  return (
    <section class="w-full max-w-screen-2xl mx-auto">
      <button
        class="flex items-center -mt-8 mb-8"
        onClick={() => navigate('/', { replace: true })}
      >
        <RiSystemArrowLeftLine size={24} class="fill-emerald-600" />
        <span class="ml-2 uppercase text-emerald-600">go back</span>
      </button>
      <div class="flex gap-5">
        {renderImage()}
        <h1 class="text-4xl capitalize max-w-md">
          {project().name || 'Nome do projeto'}
        </h1>
        <FavoriteButton favorite={isFavorite} toggleFavorite={toggleFavorite} />
        <EditProjectModal
          projectId={project().id}
          initialDescription={project().description}
          initialPlatforms={project().platforms}
          initialName={project().name}
        />
        <DeleteProjectModal
          projectId={project().id}
          projectName={project().name}
        />
      </div>
      <h3 class="text-xl font-bold mt-5 mb-1">Project description</h3>
      <p class="text-zinc-600">{project().description || ''}</p>
      <div class="flex flex-col mt-6 mb-3 flex-wrap gap-2">
        <span class="font-bold text-xl">Upload informations:</span>
        <span class="font-bold text-slate-800">
          Project ID: <span class="font-normal">{project().id}</span>
        </span>
        <span class="font-bold text-slate-800">
          Project upload key: <span class="font-normal">{project().key}</span>
        </span>
      </div>
      <div class="flex mb-3 mt-6 flex-wrap gap-2">
        <span class="font-bold">Showing:</span>
        <For
          each={ArtifactTypesOptions.filter((type) =>
            project().platforms.includes(type.value),
          )}
        >
          {(type) => (
            <Checkbox
              checked={types().includes(type.value)}
              label={type.label}
              value={type.value}
              onChange={handleCheckboxClick}
              class="mr-4"
            />
          )}
        </For>
      </div>
      <Show when={!isDownloading()} fallback={<p>Downloading...</p>}>
        <ProjectArtifactList
          projectId={params.projectId}
          filter={types()}
          setIsDownloading={setIsDownloading}
        />
      </Show>
    </section>
  );
};

export default ProjectDetails;
