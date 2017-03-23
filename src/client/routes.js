import BaseLayout from './layouts/Base.jsx';
import SidebarLayout from './layouts/Sidebar.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';

export default {
  component: BaseLayout,
  childRoutes: [
    {
      component: SidebarLayout,
      childRoutes: [
        {
          path: '/',
          // component: DashboardPage,
          getComponent: (location, callback) => {
            callback(null, DashboardPage);
          },
        },
      ],
    },

    {
      path: '/login',
      // component: LoginPage
      getComponent: (location, callback) => {
        console.log(location);
        callback(null, LoginPage)
      },
    },

  ],
}
