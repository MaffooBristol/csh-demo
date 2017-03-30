import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Menu, {SubMenu, MenuItem} from 'rc-menu';

const Topbar = ({ children }) => (
  <div>
    <div id="topbar">
      <div className="logo">CSH</div>
      <Menu mode="horizontal">
        <MenuItem><Link to="/">Containers</Link></MenuItem>
        <MenuItem><Link to="/">Something else</Link></MenuItem>
        <MenuItem><Link to="/settings">Settings</Link></MenuItem>
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
