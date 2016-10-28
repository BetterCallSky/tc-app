import { handleActions } from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'Details/LOADED';

// ------------------------------------
// Actions
// ------------------------------------


export const load = (id) => async(dispatch, getState) => {
  const challenge = await APIService.getChallenge(id);
  dispatch({ type: LOADED, payload: challenge });
};

export const actions = {
  load,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, { payload: challenge }) => ({ ...state, challenge }),
}, {
  challenge: null,
});
