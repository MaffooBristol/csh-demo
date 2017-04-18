import store from '../modules/redux/Store';
import { fetchAuth } from '../modules/redux/actions/AuthActions';

export default class Auth {
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
