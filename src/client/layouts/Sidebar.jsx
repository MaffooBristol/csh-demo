import React from 'react';

const Sidebar = ({ children }) => (
  <div>
    <div id='sidebar'>Sidebar</div>
    <div id='main'>
      {children}
    </div>
  </div>
);

export default Sidebar;
