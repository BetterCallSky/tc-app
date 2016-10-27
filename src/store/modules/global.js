import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'global/LOGGED_IN';
export const LOGGED_OUT = 'global/LOGGED_OUT';
export const LOADED = 'global/LOADED';


// ------------------------------------
// Actions
// ------------------------------------


export const logout = () => async (dispatch) => {
  dispatch({ type: LOGGED_OUT });
  dispatch(push('/login'));
};

export const actions = {
  logout,
};

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [LOGGED_IN]: (state, { payload: handle }) => ({ ...state, handle }),
  [LOGGED_OUT]: (state) => ({ ...state, handle: null }),
}, {
  handle: localStorage.handle,
});
