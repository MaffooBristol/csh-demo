import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const LoginForm = ({ className, onSubmit, onChange }) => (
  <Card className={className}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">CSH Demo: Login</h2>
      <small>
        This login will expire in 2 minutes.
      </small>
      <div>
        <TextField
          floatingLabelText="Username"
          type="text"
          name="username"
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
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

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginForm;
