import type { Component } from 'solid-js';
import { For, Show, createResource, createSignal } from 'solid-js';
import { A, Params } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { RiSystemArrowLeftLine } from 'solid-icons/ri';

import type { Project } from '../schemas/Project';

import { useUserContext } from '../contexts/UserContext';

import Checkbox from '../components/Checkbox';
import { fetchProjectData } from '../api/project';
import FavoriteButton from '../components/FavoriteButton';
import EditProjectModal from '../components/EditProjectModal';
import DeleteProjectModal from '../components/DeleteProjectModal';
import { ArtifactTypesOptions } from '../schemas/Artifact';
import ProjectArtifactList from '../components/ProjectArtifactList';
import ProjectImage from '../components/ProjectImage';

interface PageParams extends Params {
  projectId: string;
}

const ProjectDetails: Component = () => {
  const params = useParams<PageParams>();
  const { user, updateFavoriteProjects } = useUserContext();

  const [types, setTypes] = createSignal(['ios', 'android']);
  const [isDownloading, setIsDownloading] = createSignal(false);
  const [isFavorite, setIsFavorite] = createSignal(
    user().favoriteProjects.includes(params.projectId),
  );

  const [project, { refetch }] = createResource<Project, string>(
    () => params.projectId,
    fetchProjectData,
    { initialValue: {} as Project },
  );

  const toggleFavorite = async () => {
    await updateFavoriteProjects(params.projectId);
    setIsFavorite((prev) => !prev);
  };

  const handleCheckboxClick = (type: string) => {
    if (types().includes(type)) {
      setTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setTypes((prev) => [...prev, type]);
    }
  };

  return (
    <section class="w-full max-w-screen-2xl mx-auto">
      <A class="flex items-center mb-4" href="/">
        <RiSystemArrowLeftLine size={24} class="fill-emerald-600" />
        <span class="ml-2 uppercase text-emerald-600">go back</span>
      </A>
      <Show when={!project.loading}>
        <div class="flex gap-5">
          <ProjectImage
            image={project().image}
            projectId={project()._id.$oid}
            refetchProject={refetch}
          />
          <h1 class="text-4xl max-w-md">
            {project().name || 'Nome do projeto'}
          </h1>
          <FavoriteButton
            favorite={isFavorite()}
            toggleFavorite={toggleFavorite}
          />
          <EditProjectModal
            projectId={project()._id.$oid}
            initialDescription={project().description}
            initialPlatforms={project().platforms}
            initialName={project().name}
            refetchProject={refetch}
          />
          <DeleteProjectModal
            projectId={project()._id.$oid}
            projectName={project().name}
          />
        </div>
        <h3 class="text-xl font-bold mt-5 mb-1">Project description</h3>
        <p class="text-zinc-600">{project().description || ''}</p>
        <div class="flex flex-col mt-6 mb-3 flex-wrap gap-2">
          <span class="font-bold text-xl">Upload informations:</span>
          <span class="font-bold text-slate-800">
            Project ID: <span class="font-normal">{project()._id.$oid}</span>
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
      </Show>
    </section>
  );
};

export default ProjectDetails;
