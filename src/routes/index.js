import CoreLayout from 'layouts/CoreLayout';
import LoginRoute from './Login';
import DashboardRoute from './Dashboard';
import DetailsRoute from './Details';

export const createRoutes = (store) => ({
  path: '/',
  childRoutes: [
    // user must be not logged in
    {
      onEnter: (nextState, replace, cb) => {
        if (localStorage.handle) {
          replace('/');
        }
        cb();
      },
      childRoutes: [
        LoginRoute(store),
      ],
    },
    // user must be logged in
    {
      onEnter: (nextState, replace, cb) => {
        if (!localStorage.handle) {
          replace('/login');
        }
        cb();
      },
      component: CoreLayout,
      indexRoute: {
        onEnter: (nextState, replace, cb) => {
          replace('/dashboard');
          cb();
        },
      },
      childRoutes: [
        DetailsRoute(store),
        DashboardRoute(store),
      ],
    },
  ],
});


export default createRoutes;
