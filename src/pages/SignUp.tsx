import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { useUserContext } from '../contexts/UserContext';

import Input from '../components/Input';
import Button from '../components/Button';

const SignUp: Component = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();
  const { signUp } = useUserContext();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = {
        name: name(),
        email: email(),
        password: password(),
      };
      await signUp(data);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      // TODO: error handling
    }
  };

  return (
    <section class="w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center">
      <p class="mt-4 mb-12">
        We need some basic identifying informations about you to get started.
      </p>
      <form onSubmit={handleSubmit} id="register-form" class="w-96">
        <Input
          type="text"
          label="Name"
          name="name"
          value={name()}
          maxLength={50}
          required
          placeholder="Input your name"
          class="mb-4"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Input
          type="email"
          label="E-mail"
          name="name"
          value={email()}
          maxLength={50}
          required
          placeholder="Login"
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
      <Button
        form="register-form"
        class="mt-8"
        disabled={!name() || !email() || !password()}
      >
        Submit
      </Button>
    </section>
  );
};

export default SignUp;
