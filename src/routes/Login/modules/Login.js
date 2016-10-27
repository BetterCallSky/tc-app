import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------


export const login = (handle) => (dispatch) => {
  localStorage.handle = handle;
  dispatch(push('/dashboard'));
};

export const actions = {
  login,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({}, {});
