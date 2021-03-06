import React from 'react';
import { Helmet } from 'react-helmet';

const DebugPage = () => (
  <div>
    <Helmet>
      <title>Debug</title>
    </Helmet>
    <h1>Debug</h1>
    <p>
      Nothing here yet, but when I get the state layer in this will fetch
      various bits of info from Node.
    </p>
  </div>
);

export default DebugPage;
