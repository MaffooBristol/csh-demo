import React from 'react';
import BaseLayout from './layouts/Base.jsx';
import SidebarLayout from './layouts/Sidebar.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import { browserHistory } from 'react-router';

import Auth from './modules/Auth.js';

export default {
  component: BaseLayout,
  childRoutes: [
    {
      component: SidebarLayout,
      childRoutes: [
        {
          path: '/',
          component: DashboardPage,
          onEnter: (nextState, replace) => {
            if (!Auth.isAuthed()) {
              replace('/login');
            }
          },
        },
      ],
    },
    {
      path: '/login',
      component: LoginPage,
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
