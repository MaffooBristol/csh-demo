import React, { PropTypes } from 'react';

const Base = ({ children }) => (
  <div id="container">
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Base;
