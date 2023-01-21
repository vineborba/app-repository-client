import { A } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import { login } from '../api/user';

import HomeImage from '../assets/images/home.webp';

import Button from '../components/Button';
import Input from '../components/Input';

const Home: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLoginFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email: email(),
      password: password(),
    }
    await login(data);
  };

  return (
    <section class="w-full max-w-screen-2xl mx-auto">
      {/* {isAuthenticated ? (
        <div class="flex flex-col gap-4">
          <p class="text-lg">
            Olá, <span class="text-emerald-400 ">{user!.name}</span>
          </p>
          <CreateProjectModal />
          <ProjectsList
            favorites
            projects={projects?.filter(filterFavoriteProjects)}
          />
          <ProjectsList projects={projects} />
        </div>
      ) : ( */}
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
            type="text"
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
            type="text"
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
          <A href="/register" class="font-bold text-blue-400">
            Create one!
          </A>
        </p>
      </div>
      {/* )} */}
    </section>
  );
};

export default Home;
