import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------


export const login = (handle) => async (dispatch) => {
  await APIService.fetchChallenges(handle);
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
