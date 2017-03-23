import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes.js';
import styles from './styles/main.styl';

class App extends React.Component {
  constructor () {
    super();
    injectTapEventPlugin();
  }
  render () {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory} routes={routes} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
