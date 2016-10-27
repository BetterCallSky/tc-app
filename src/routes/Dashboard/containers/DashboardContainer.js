import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/Dashboard';

import DashboardView from '../components/DashboardView';

const resolve = [{
  promise: ({ store, location}) => {
    const filter = {};
    switch (location.pathname) {
      case '/code':
        filter.challengeType = 'Code';
        break;
      case '/assembly':
        filter.challengeType = 'Assembly Competition';
        break;
      case '/ui-prototype':
        filter.challengeType = 'UI Prototype Competition';
        break;
      case '/f2f':
        filter.challengeType = 'First2Finish';
        break;
      default:
        filter.registeredHandle = localStorage.handle;
    }
    return store.dispatch(actions.load(filter));
  },
}];

const mapState = (state) => state.dashboard;

export default asyncConnect(resolve, mapState, actions)(DashboardView);
