
export default async (store) => {
  const handle = localStorage.handle;
  if (!accessToken) {
    store.dispatch({ type: 'global/LOADED', payload: null });
    return;
  }
  try {
    const user = await OpenAccessAPI.getLoggedInUser();
    store.dispatch({
      type: 'global/LOADED',
      payload: {
        firstName: user.first_name,
        lastName: user.last_name,
        id: user.user_id,
      }
    });
  } catch (e) {
    console.error(e);
    store.dispatch({ type: 'global/LOADED', payload: null });
  }
};
