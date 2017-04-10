import React from 'react';
import { Helmet } from 'react-helmet';

import { Link } from 'react-router';

const NotFoundPage = () => (
  <div>
    <Helmet>
      <title>404!</title>
    </Helmet>
    <h1>404 Not Found :(</h1>
    <Link to="/">Go back</Link>
  </div>
);

export default NotFoundPage;
