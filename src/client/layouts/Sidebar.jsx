import React from 'react';
import { Link, IndexLink } from 'react-router';

const Sidebar = ({ children }) => (
  <div>
    <div id='topbar'>
      <img src='/img/elz_logo.jpg' className='logo' />
      <Link to='/logout' className='logout'>Log Out</Link>
    </div>
    <div id='main'>
      {children}
    </div>
  </div>
);

export default Sidebar;
