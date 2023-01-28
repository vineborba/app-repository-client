import type { Component } from 'solid-js';
import { For, mergeProps, Show } from 'solid-js';

import type { Project } from '../schemas/Project';

import ProjectCard from '../components/ProjectCard';

interface ProjectsListProps {
  projects: Project[] | undefined;
  favorites?: boolean;
}

const ListEmptyState: Component<{ favorites: boolean }> = (props) => (
  <Show
    when={props.favorites}
    fallback={
      <span class="text-zinc-600">
        'Nothing to show here at the moment! 😅'
      </span>
    }
  >
    <span class="text-zinc-600">
      When you favoritee a project, it will show here! 🤩
    </span>
  </Show>
);

const ProjectsList: Component<ProjectsListProps> = (
  _props: ProjectsListProps,
) => {
  const props = mergeProps({ favorites: false }, _props);

  return (
    <>
      <Show
        when={props.favorites}
        fallback={<span class="text-xl">This are the available projects:</span>}
      >
        <span class="text-xl">Favorites:</span>
      </Show>
      <Show
        when={props.projects?.length}
        fallback={<ListEmptyState favorites={props.favorites} />}
      >
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <For each={props.projects}>
            {(p) => (
              <ProjectCard
                name={p.name}
                description={p.description}
                projectId={p._id.$oid}
                platforms={p.platforms}
                image={p.image}
              />
            )}
          </For>
        </div>
      </Show>
    </>
  );
};

export default ProjectsList;
