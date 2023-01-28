import { Component, createEffect } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';

import HomeImage from '../assets/images/home.webp';

import { Project } from '../schemas/Project';

import { fetchProjects } from '../api/project';

import { useUserContext } from '../contexts/UserContext';

import Button from '../components/Button';
import CreateProjectModal from '../components/CreateProjectModal';
import Input from '../components/Input';
import ProjectsList from '../components/ProjectsList';

const LoggedOutHome: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const { signIn } = useUserContext();

  const handleLoginFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = {
        email: email(),
        password: password(),
      };
      await signIn(data);
    } catch (error) {
      console.log(error);
      // TODO: error handling
    }
  };

  return (
    <div class="flex flex-col items-center">
      <img
        src={HomeImage}
        alt="Android and iOS logos"
        width={200}
        height={38}
      />
      <span class="text-center mt-2">
        Welcome to Open App Distribution System
      </span>
      <form onSubmit={handleLoginFormSubmit} id="login-form" class="my-6 w-96">
        <Input
          type="email"
          label="E-mail"
          name="name"
          value={email()}
          maxLength={50}
          required
          placeholder="E-mail"
          class="mb-4"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          type="password"
          label="Password"
          name="name"
          value={password()}
          maxLength={50}
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </form>
      <Button type="submit" form="login-form">
        Sign In
      </Button>
      <p class="mt-4">
        Doesn't have an account yet?&nbsp;
        <A href="/sign-up" class="font-bold text-blue-400">
          Create one!
        </A>
      </p>
    </div>
  );
};

const Home: Component = () => {
  const { user } = useUserContext();
  const [projects, setProjects] = createSignal<Project[]>([]);

  createEffect(() => {
    if (user()) {
      fetchProjects().then((res) => setProjects(res));
    } else {
      setProjects([]);
    }
  });

  const filterFavoriteProjects = (project: Project) =>
    user().favoriteProjects.includes(project._id.$oid);

  return (
    <section class="w-full max-w-screen-2xl mx-auto">
      <Show when={user()} fallback={<LoggedOutHome />}>
        <div class="flex flex-col gap-4">
          <p class="text-lg">
            Olá, <span class="text-emerald-400 ">{user().name}</span>
          </p>
          <CreateProjectModal />
          <ProjectsList
            favorites
            projects={projects().filter(filterFavoriteProjects)}
          />
          <ProjectsList projects={projects()} />
        </div>
      </Show>
    </section>
  );
};

export default Home;
