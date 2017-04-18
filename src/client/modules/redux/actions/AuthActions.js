import axios from 'axios';

export const fetchAuth = token => (dispatch) => {
  axios.get('/api/check-auth', {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}`,
    },
  })
  .then((res) => {
    dispatch({ type: 'FETCH_AUTH_FULFILLED', data: res.data });
  })
  .catch((err) => {
    dispatch({ type: 'FETCH_AUTH_REJECTED', err: err.message });
  });
};

export default fetchAuth;
