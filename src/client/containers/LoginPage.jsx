import React from 'react';

import LoginForm from '../components/LoginForm.jsx';

export default class LoginPage extends React.Component {
  render () {
    return (
      <div id='login-page'>
        <LoginForm
          className='login-form'
          onSubmit={this.submitForm}
        />
      </div>
    );
  }
}
