import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Menu, { MenuItem } from 'rc-menu';

const Topbar = ({ children }) => (
  <div>
    <div id="topbar">
      <div className="logo">CSH</div>
      <Menu mode="horizontal">
        <MenuItem><IndexLink to="/" activeClassName="active">Containers</IndexLink></MenuItem>
        <MenuItem><Link to="/debug" activeClassName="active">Debug</Link></MenuItem>
        <MenuItem><Link to="/settings" activeClassName="active">Settings</Link></MenuItem>
      </Menu>
      <Link to="/logout" className="logout">Log Out</Link>
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
