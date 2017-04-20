const Auth = (state = {
  fetching: false,
  fetched: false,
  authed: null,
  data: {},
}, action) => {
  switch (action.type) {
    case 'FETCH_AUTH_FULFILLED':
      return { ...state, fetching: false, fetched: true, authed: true, data: action.data };
    case 'FETCH_AUTH_REJECTED':
      return { ...state, fetching: false, fetched: true, authed: false, err: action.err };
    default:
      return state;
  }
};

export default Auth;
