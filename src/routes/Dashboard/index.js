import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;
      const reducer = require('./modules/Dashboard').default;
      injectReducer(store, { key: 'dashboard', reducer });
      cb(null, Dashboard);
    }, 'Dashboard');
  },
});
