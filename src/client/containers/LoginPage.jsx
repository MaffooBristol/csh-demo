import React from 'react';
import 'whatwg-fetch';

import Auth from '../modules/Auth.js';
import LoginForm from '../components/LoginForm.jsx';

export default class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        email: '',
        password: '',
      }
    };
    this.changeUser = this.changeUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  changeUser (event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }
  submitForm (e) {
    e.preventDefault();
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log(xhr);
      if (xhr.status === 200) {
        Auth.auth(xhr.response.token);
        window.location = '/';
      }
      else {
        alert('Could not log in');
      }
    });
    xhr.send(formData);
  }
  render () {
    return (
      <div id='login-page'>
        <LoginForm
          className='login-form'
          onChange={this.changeUser}
          onSubmit={this.submitForm}
        />
      </div>
    );
  }
}
