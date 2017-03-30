import { browserHistory } from 'react-router';

import BaseLayout from './layouts/Base';
import TopbarLayout from './layouts/Topbar';
import DashboardPage from './containers/DashboardPage';
import SettingsPage from './containers/SettingsPage';
import LoginPage from './containers/LoginPage';

import Auth from './modules/Auth';

let authCheckInterval = null;

export default {
  basePath: '/',
  component: BaseLayout,
  childRoutes: [
    {
      component: TopbarLayout,
      onEnter: (nextState, replace) => {
        if (!Auth.isAuthed()) {
          return replace('/login');
        }
        authCheckInterval = setInterval(() => {
          Auth.authCheck((err) => {
            if (err) {
              Auth.unauth();
              browserHistory.replace('/login');
            }
          });
        }, 5000);
        return this;
      },
      childRoutes: [
        {
          path: '/',
          component: DashboardPage,
        },
        {
          path: '/settings',
          component: SettingsPage,
        }
      ],
    },
    {
      path: '/login',
      component: LoginPage,
      onEnter: () => {
        clearInterval(authCheckInterval);
      },
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.unauth();
        replace('/login');
      },
    },
  ],
};
