import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'challenge/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Details = require('./containers/DetailsContainer').default;
      const reducer = require('./modules/Details').default;
      injectReducer(store, { key: 'details', reducer });
      cb(null, Details);
    }, 'Details');
  },
});
