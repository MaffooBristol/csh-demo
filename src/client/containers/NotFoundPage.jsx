import React from 'react';

import { Link } from 'react-router';

const NotFoundPage = () => (
  <div>
    <h1>404 Not Found :(</h1>
    <Link to="/">Go back</Link>
  </div>
);

export default NotFoundPage;
