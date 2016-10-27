import { handleActions } from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'Dashboard/LOADED';
export const LOAD_MORE = 'Dashboard/LOAD_MORE';
export const LOADING = 'Dashboard/LOADING';

// ------------------------------------
// Actions
// ------------------------------------


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
      return new Date(a.submissionEndDate).getTime() - new Date(b.submissionEndDate);
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
  [LOADING]: (state) => ({...state, isLoading: true})
}, {
  baseFilter: {},
  activeChallenges: [],
  pastChallenges: [],
  pastTotal: 0,
  isLoading: false,
});
