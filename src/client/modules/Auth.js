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
  static authCheck (callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/check-auth');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        callback(null)
      }
      else {
        callback(xhr.status);
      }
    });
    xhr.send();
  }
}
