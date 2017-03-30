import React from 'react';

export default () => (
  <div>
    <h1>Dashboard</h1>
    <p>
      Testing, testing, one two three...
    </p>
    <p>
      This server is running off of&nbsp;
      <strong>
        {process.env._system_name}&nbsp;
        {process.env._system_version}
      </strong>
    </p>
  </div>
);
