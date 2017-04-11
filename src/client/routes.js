import { browserHistory } from 'react-router';
import moment from 'moment';

import BaseLayout from './layouts/Base';
import TopbarLayout from './layouts/Topbar';
import DashboardPage from './containers/DashboardPage';
import DebugPage from './containers/DebugPage';
import SettingsPage from './containers/SettingsPage';
import LoginPage from './containers/LoginPage';
import ChatbotPage from './containers/ChatbotPage';
import ChatbotTestPage from './containers/ChatbotTestPage';
import NotFoundPage from './containers/NotFoundPage';

import Auth from './modules/Auth';

let authCheckInterval = null;

const checkAuth = () => {
  Auth.authCheck((err, response) => {
    if (err) {
      Auth.unauth();
      browserHistory.replace('/login');
    }
    else {
      const duration = moment.unix(response.decoded.exp).diff(moment.unix(response.time));
      console.log(`Time left: ${moment.duration(duration).humanize()}`);
    }
  });
};

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
        authCheckInterval = setInterval(checkAuth, 20000);
        checkAuth();
        return this;
      },
      childRoutes: [
        {
          path: '/',
          component: DashboardPage,
        },
        {
          path: '/debug',
          component: DebugPage,
        },
        {
          path: '/settings',
          component: SettingsPage,
        },
        {
          path: '/container/:slug',
          component: ChatbotPage,
        },
        {
          path: '/container/:slug/test',
          component: ChatbotTestPage,
        },
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
    {
      path: '*',
      component: NotFoundPage,
    },
  ],
};
