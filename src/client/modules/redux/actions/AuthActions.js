import axios from 'axios';

export const fetchAuth = () => (dispatch) => {
  dispatch({ type: 'FETCH_AUTH_START' });
  axios.get('/api/check-auth')
  .then((res) => {
    dispatch({ type: 'FETCH_AUTH_FULFILLED', data: res.data });
  })
  .catch((err) => {
    dispatch({ type: 'FETCH_AUTH_REJECTED', err: err.message });
  });
};

export default fetchAuth;
