import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class DashboardPage extends React.Component {
  render () {
    return (
      <div>
        <h1>Dashboard page!</h1>
        <Link to='/login'>Log In</Link>
      </div>
    );
  }
}
