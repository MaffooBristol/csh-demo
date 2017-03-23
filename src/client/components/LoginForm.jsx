import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Card className={this.props.className}>
        <form action='/'>
          <div>
            <TextField
              floatingLabelText="Username"
              type="text"
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
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
