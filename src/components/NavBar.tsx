import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

import Button from './Button';

const NavBar: Component = () => {
  // const router = useRouter();
  // const { data: session } = useSession();

  // const logOut = useCallback(async () => {
  //   await signOut();
  //   router.replace('/');
  // }, [router]);

  return (
    <header class="py-2 px-4 2xl:px-40 bg-emerald-400 shadow-md">
      <div class="flex justify-between items-center max-w-screen-2xl mx-auto h-12">
        <A
          href="/"
          class="text-white text-base capitalize hover:cursor-pointer"
        >
          open app distribution system
        </A>

        {/* {!!session && ( */}
        <Button class="w-fit px-2" /* onClick={logOut} */>Logout</Button>
        {/* )} */}
      </div>
    </header>
  );
};

export default NavBar;
