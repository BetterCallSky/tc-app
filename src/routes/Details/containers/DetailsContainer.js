import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/Details';

import DetailsView from '../components/DetailsView';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.details;

export default asyncConnect(resolve, mapState, actions)(DetailsView);
