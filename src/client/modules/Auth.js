import axios from 'axios';

import store from '../modules/redux/Store';
import { fetchAuth } from '../modules/redux/actions/AuthActions';

class Auth {
  static isAuthed () {
    return localStorage.getItem('token') !== null;
  }
  static getToken () {
    return localStorage.getItem('token');
  }
  static auth (token) {
    localStorage.setItem('token', token);
  }
  static unauth () {
    localStorage.removeItem('token');
  }
  static authCheck () {
    store.dispatch(fetchAuth(Auth.getToken()));
  }
}

axios.defaults.headers.common.Authorization = `bearer ${Auth.getToken()}`;

export default Auth;
