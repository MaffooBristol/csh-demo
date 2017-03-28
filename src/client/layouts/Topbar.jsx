import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Topbar = ({ children }) => (
  <div>
    <div id="topbar">
      <div className="logo">CSH</div>
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
