import { createSignal, Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { useUserContext } from '../contexts/UserContext';

import Input from '../components/Input';
import Button from '../components/Button';
import GenericError from '../components/GenericError';
import NavButton from '../components/NavButton';

const SignUp: Component = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [emailError, setEmailError] = createSignal('');
  const [genericError, setGenericError] = createSignal(false);

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
      if (error.data === 'User already registered') {
        setEmailError('E-mail already registered.');
      } else {
        setGenericError(true);
      }
    }
  };

  const handleOnChangeEmail = (e: OnChangeInputEvent) => {
    if (emailError()) setEmailError('');
    setEmail(e.currentTarget.value);
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
          error={emailError()}
          placeholder="Login"
          class="mb-4"
          onChange={handleOnChangeEmail}
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
      <GenericError visible={genericError()} />
      <div class="mt-8">
        <NavButton class="mr-3" buttonType="secondary" href="/">
          Go Back
        </NavButton>
        <Button
          form="register-form"
          disabled={!name() || !email() || !password()}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default SignUp;
