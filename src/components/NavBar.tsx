import { Component, Show } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import { useUserContext } from '../contexts/UserContext';

import Button from './Button';

const NavBar: Component = () => {
  const { user, signOut } = useUserContext();
  const navigate = useNavigate();

  const signOutAction = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <header class="py-2 px-4 2xl:px-40 bg-emerald-400 shadow-md">
      <div class="flex justify-between items-center max-w-screen-2xl mx-auto h-12">
        <A
          href="/"
          class="text-white text-base capitalize hover:cursor-pointer"
        >
          App Repository
        </A>

        <Show when={user()}>
          <Button class="w-fit px-2" onClick={signOutAction}>
            Logout
          </Button>
        </Show>
      </div>
    </header>
  );
};

export default NavBar;
