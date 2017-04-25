import React from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      user: {
        email: '',
        password: '',
      },
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
    axios.post('/login', formData, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    .then(({ data }) => {
      Auth.auth(data.token);
      window.location = '/';
    })
    .catch(({ message = 'unknown' }) => {
      alert(`Could not log in. Reason: ${message}`);
    });
  }
  render () {
    return (
      <div id="login-page">
        <LoginForm
          className="login-form"
          onChange={this.changeUser}
          onSubmit={this.submitForm}
        />
      </div>
    );
  }
}
