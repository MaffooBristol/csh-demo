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

import store from './modules/redux/Store';
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
        authCheckInterval = setInterval(Auth.authCheck, 20000);
        Auth.authCheck();
        store.subscribe(() => {
          const state = store.getState();
          if (state.auth.authed) {
            const data = state.auth.data.decoded;
            const duration = moment.unix(data.decoded.exp).diff(moment.unix(data.time));
            console.log(`Time left: ${moment.duration(duration).humanize()}`);
          }
          else {
            Auth.unauth();
            browserHistory.replace('/login');
          }
        });
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
