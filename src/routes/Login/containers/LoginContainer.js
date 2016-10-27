import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/Login';

import LoginView from '../components/LoginView';

const resolve = [{
  promise: ({ params, store }) => Promise.resolve(),
}];

const mapState = (state) => state.login;

export default asyncConnect(resolve, mapState, actions)(LoginView);
