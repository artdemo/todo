import { Main } from './pages/Main';
import { Completed } from './pages/Completed';
import { Settings } from './pages/Settings';
import { NoMatch } from './pages/NoMatch';

export const routes = [
  {
    path: '/',
    component: Completed,
    title: 'Completed',
  },
  {
    path: '/main',
    component: Main,
    title: 'Main',
  },
  {
    path: '/settings',
    component: Settings,
    title: 'Settings',
  },
  { path: '*', component: NoMatch, title: '404' },
];
