import { RouteProps } from 'react-router';

import Home from './pages/Home';

const routes = new Map<string, RouteProps>();

routes.set('home', { component: Home, path: '/', exact: true });

export { routes };
