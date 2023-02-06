import type { RouteDefinition } from '@solidjs/router';
import type { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { lazy } from 'solid-js';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

const routes: RouteDefinition[] = [
  { path: '/', component: lazy(() => import('./pages/Home')) },
  { path: '/sign-up', component: lazy(() => import('./pages/SignUp')) },
  {
    path: '/project/:projectId',
    component: lazy(() => import('./pages/Project')),
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <>
      <NavBar />
      <main class="flex flex-col flex-grow h-full shadow-2xl py-8 px-4 2xl:px-40">
        <Routes />
      </main>
      <Footer />
    </>
  );
};

export default App;
