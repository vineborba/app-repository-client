import type { Component, JSX } from 'solid-js';
import { For } from 'solid-js';
import { RiLogosAndroidFill, RiLogosAppleFill } from 'solid-icons/ri';
import { A } from '@solidjs/router';

interface ProjectCardProps {
  name: string;
  description?: string;
  projectId: string;
  platforms: string[];
  image?: string;
  class?: string;
}

const platformsRep: Record<string, JSX.Element> = {
  android: <RiLogosAndroidFill color="#3DDC84" size={24} />,
  ios: <RiLogosAppleFill size={24} />,
};

const ProjectCard: Component<ProjectCardProps> = (props: ProjectCardProps) => {
  return (
    <A href={`/projects/${props.projectId}`}>
      <article
        class={`flex border-slate-300 border rounded-lg hover:cursor-pointer pr-4 h-32 ${props.class}`}
      >
        <img
          width={128}
          height={128}
          src={props.image || '/assets/svgs/logo.svg'}
          alt="Imagem do projeto"
          class="rounded-l-lg"
          classList={{
            'w-32 h-32': !!props.image,
            'ml-2 w-30 h-32': !props.image,
          }}
        />
        <div class="flex flex-col flex-grow pl-4 py-2 overflow-hidden">
          <span class="capitalize text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
            {props.name}
          </span>
          <div class="h-[1px] bg-slate-300 my-2" />
          <span class="text-zinc-600 overflow-hidden text-ellipsis whitespace-nowrap">
            {props.description}
          </span>
          <div class="flex mt-2">
            <For each={props.platforms}>{(p) => platformsRep[p]}</For>
          </div>
        </div>
      </article>
    </A>
  );
};

export default ProjectCard;
