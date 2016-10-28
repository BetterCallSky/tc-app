import { handleActions } from 'redux-actions';
import APIService from 'services/APIService';
import io from 'socket.io-client';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'Dashboard/LOADED';
export const LOAD_MORE = 'Dashboard/LOAD_MORE';
export const LOADING = 'Dashboard/LOADING';
export const CHALLENGE_UPDATED = 'Dashboard/CHALLENGE_UPDATED';

// ------------------------------------
// Actions
// ------------------------------------

let socket;

export const load = (baseFilter) => async(dispatch) => {
  const { active, past } = await Promise.props({
    active: APIService.searchChallenges({
      ...baseFilter,
      currentStatus: 'Active',
      sort: '-submissionEndDate',
      limit: 1000,
    }),
    past: APIService.searchChallenges({
      ...baseFilter,
      currentStatus: 'Completed',
    }),
  });
  const canSubmit = (a) => a.currentPhaseName === 'Registration' || a.currentPhaseName === 'Submission';
  active.items.sort((a, b) => {
    const canA = canSubmit(a);
    const canB = canSubmit(b);
    if (canA && canB) {
      return new Date(b.postingDate).getTime() - new Date(a.postingDate);
    }
    if (canA) {
      return -1;
    }
    if (canB) {
      return 1;
    }
    return 0;
  });
  dispatch({ type: LOADED, payload: {baseFilter, activeChallenges: active.items, past } });

//  if (!socket) {
//    socket = io('/');
//    socket.on('challenge-update', (challenge) => {
//      dispatch({type: CHALLENGE_UPDATED, payload: challenge});
//    });
//  }
};


export const loadMore = () => async(dispatch, getState) => {
  const {pastChallenges, isLoading, baseFilter} = getState().dashboard;
  if (isLoading) {
    return;
  }
  dispatch({ type: LOADING });
  const {items} = await APIService.searchChallenges({
    ...baseFilter,
    currentStatus: 'Completed',
    offset: pastChallenges.length,
  });
  dispatch({ type: LOAD_MORE, payload: items });
};

export const actions = {
  load,
  loadMore,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, { payload: { baseFilter, activeChallenges, past } }) => ({
    ...state,
    baseFilter,
    activeChallenges,
    pastChallenges: past.items,
    pastTotal: past.total,
  }),
  [LOAD_MORE]: (state, { payload: items }) => ({
    ...state,
    isLoading: false,
    pastChallenges: [...state.pastChallenges, ...items],
  }),
  [LOADING]: (state) => ({...state, isLoading: true}),
  [CHALLENGE_UPDATED]: (state, {payload: challenge}) => ({
    ...state,
    activeChallenges: state.activeChallenges.map((item) => (item.id === challenge.id ? challenge : item)),
    pastChallenges: state.pastChallenges.map((item) => (item.id === challenge.id ? challenge : item)),
  }),
}, {
  baseFilter: {},
  activeChallenges: [],
  pastChallenges: [],
  pastTotal: 0,
  isLoading: false,
});
