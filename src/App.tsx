import { useRoutes } from '@solidjs/router';
import type { Component } from 'solid-js';
import { lazy } from 'solid-js';

import NavBar from './components/NavBar';

const routes = [
  { path: '/', component: lazy(() => import('./pages/Home')) },
  { path: '/register', component: lazy(() => import('./pages/Register')) },
  { path: '/:projectId', component: lazy(() => import('./pages/Project')) },
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <>
      <NavBar />
      <main class="flex flex-col h-full shadow-2xl py-12 px-4 2xl:px-40 md:py-24">
        <Routes />
      </main>
    </>
  );
};

export default App;
