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
}
