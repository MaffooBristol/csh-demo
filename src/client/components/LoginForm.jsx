import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Card className={this.props.className}>
        <img src='/img/elz_logo.jpg' className='logo' />
        <form action='/' onSubmit={this.props.onSubmit}>
          <h2 className="card-heading">Login</h2>
          <div>
            <TextField
              floatingLabelText="Username"
              type="text"
              name="username"
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <RaisedButton
              type="submit"
              label="Login"
              style={{
                background: '#003399',
              }}
            />
          </div>
        </form>
      </Card>
    );
  }
}
