import React from 'react';

export default () => (
  <div>
    <h1>Dashboard</h1>
    <p>
      Testing, testing, one two three...
    </p>
    <p>
      This server is running off of
      <strong>
        {process.env._system_name}
        {process.env._system_version}
      </strong>
    </p>
  </div>
);
