import React from 'react';
import { Helmet } from 'react-helmet';

import Chatbots from '../components/Chatbots';

export default () => (
  <div>
    <h1>Containers</h1>
    <Helmet>
      <title>Containers</title>
    </Helmet>
    <div className="chatbots">
      <Chatbots />
    </div>
  </div>
);
