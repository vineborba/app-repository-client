/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import App from './App';
import { UserProvider } from './contexts/UserContext';

render(
  () => (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  ),
  document.querySelector('#root') as HTMLElement,
);
