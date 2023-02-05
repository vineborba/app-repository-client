import { createSignal, createResource, Component, Show } from 'solid-js';
import { A } from '@solidjs/router';

import HomeImage from '../assets/images/home.webp';

import { Project } from '../schemas/Project';

import { fetchProjects } from '../api/project';

import { useUserContext } from '../contexts/UserContext';

import Button from '../components/Button';
import CreateProjectModal from '../components/CreateProjectModal';
import Input from '../components/Input';
import ProjectsList from '../components/ProjectsList';
import GenericError from '../components/GenericError';

const LoggedOutHome: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [loginError, setLoginError] = createSignal('');
  const [genericError, setGenericError] = createSignal(false);
  const { signIn } = useUserContext();

  const handleLoginFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (genericError) setGenericError(false);
      const data = {
        email: email(),
        password: password(),
      };
      await signIn(data);
    } catch (error) {
      if (error.data === 'Invalid credentials') {
        setLoginError('Invalid user or password.');
      } else {
        setGenericError(true);
      }
    }
  };

  const handleOnChangeEmail = (e: OnChangeInputEvent) => {
    if (loginError()) setLoginError('');
    setEmail(e.currentTarget.value);
  };

  const handleOnChangePassword = (e: OnChangeInputEvent) => {
    if (loginError()) setLoginError('');
    setPassword(e.currentTarget.value);
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
          error={loginError()}
          placeholder="E-mail"
          class="mb-4"
          onChange={handleOnChangeEmail}
        />
        <Input
          type="password"
          label="Password"
          name="name"
          value={password()}
          maxLength={50}
          required
          error={loginError()}
          placeholder="Password"
          onChange={handleOnChangePassword}
        />
      </form>
      <GenericError visible={genericError()} />
      <Button type="submit" form="login-form">
        Sign In
      </Button>
      <p class="mt-4">
        Doesn't have an account yet?&nbsp;
        <A href="/sign-up" class="font-bold text-green-400">
          Create one!
        </A>
      </p>
    </div>
  );
};

const Home: Component = () => {
  const { user } = useUserContext();

  const [projects, { refetch }] = createResource(fetchProjects, {
    initialValue: [],
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
          <CreateProjectModal refetchProjects={refetch} />
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
