import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './routes';

import './styles/main.styl';

// @todo: Send this from the backend, but I'll leave that until I've got
// redux up and running. This should definitely not be attached to the global
// scope of the window but it's best for keeping the data in one place for now.
window.chatbots = [
  {
    name: 'HarryBot',
    slug: 'harrybot',
    created: '2017-04-02T10:46:35+01:00',
    description: 'Harrybot is a very simple chatscript bot that seems to get very confused.',
  },
  {
    name: 'MaffBot',
    slug: 'maffbot',
    created: '2017-04-04T17:53:54+01:00',
    description: 'The best chatbot ever. It doesn\'t do anything, mind.',
  },
  {
    name: 'TanBot',
    slug: 'tanbot',
    created: '2017-03-28T12:12:18+01:00',
    description: 'Currency conversion for those trans-global jetsetters.',
  },
];

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
