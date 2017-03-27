import React from 'react';
import { browserHistory } from 'react-router';

import BaseLayout from './layouts/Base.jsx';
import SidebarLayout from './layouts/Sidebar.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';

import Auth from './modules/Auth.js';

let authCheckInterval = null;

export default {
  component: BaseLayout,
  childRoutes: [
    {
      component: SidebarLayout,
      onEnter: (nextState, replace) => {
        console.log('will');
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
        }, 1000);
      },
      childRoutes: [
        {
          path: '/',
          component: DashboardPage,
        },
      ],
    },
    {
      path: '/login',
      component: LoginPage,
      onEnter: (nextState, replace) => {
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
}
