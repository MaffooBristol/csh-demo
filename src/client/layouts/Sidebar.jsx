import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Sidebar = ({ children }) => (
  <div>
    <div id="topbar">
      <img src="/img/elz_logo.jpg" className="logo" alt="Elzware logo" />
      <Link to="/logout" className="logout">Log Out</Link>
    </div>
    <div id="main">
      {children}
    </div>
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Sidebar;
