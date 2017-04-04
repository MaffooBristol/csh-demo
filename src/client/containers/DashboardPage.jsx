import React from 'react';

import Chatbots from '../components/Chatbots';

export default () => (
  <div>
    <h1>Containers</h1>
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
    <div className="chatbots">
      <Chatbots />
    </div>
  </div>
);
