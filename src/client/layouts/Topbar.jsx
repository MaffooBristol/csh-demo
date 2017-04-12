import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Menu, { MenuItem } from 'rc-menu';
import RaisedButton from 'material-ui/RaisedButton';

const Topbar = ({ children }) => (
  <div>
    <div id="topbar">
      <div className="inner">
        <div className="logo">CSH</div>
        <Menu mode="horizontal">
          <MenuItem><IndexLink to="/" activeClassName="active">Containers</IndexLink></MenuItem>
          <MenuItem><Link to="/debug" activeClassName="active">Debug</Link></MenuItem>
          <MenuItem><Link to="/settings" activeClassName="active">Settings</Link></MenuItem>
        </Menu>
        <Link to="/logout" className="logout">
          <RaisedButton
            label="Log out"
            icon={<i className="material-icons">exit_to_app</i>}
            className="raised-button"
          />
        </Link>
      </div>
    </div>
    <div id="main">
      {children}
    </div>
  </div>
);

Topbar.propTypes = {
  children: PropTypes.element,
};

export default Topbar;
