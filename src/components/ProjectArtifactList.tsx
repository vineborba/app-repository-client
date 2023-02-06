import type { Component } from 'solid-js';
import { For, Match, Switch, createResource } from 'solid-js';

import { fetchArtifacts } from '../api/artifact';
import type { Artifact } from '../schemas/Artifact';
import ArtifactCard from './ArtifactCard';

interface ProjectArtifactListProps {
  projectId: string;
  filter: string[];
  setIsDownloading: (state: boolean) => void;
}

const ProjectArtifactList: Component<ProjectArtifactListProps> = (
  props: ProjectArtifactListProps,
) => {
  const [artifacts] = createResource<Artifact[], string>(
    () => props.projectId,
    fetchArtifacts,
  );

  return (
    <Switch>
      <Match when={artifacts.loading}>
        <p class="text-2xl text-emerald-400">Loading...</p>
      </Match>
      <Match when={artifacts().length === 0}>
        <p class="text-2xl text-emerald-400">Nothing to show here! 😲</p>
      </Match>
      <Match when={artifacts().length}>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-3">
          <For each={artifacts()}>
            {(artifact) => (
              <ArtifactCard
                {...artifact}
                filter={props.filter}
                setIsDownloading={props.setIsDownloading}
              />
            )}
          </For>
        </div>
      </Match>
    </Switch>
  );
};

export default ProjectArtifactList;
