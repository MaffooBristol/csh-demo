import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';
import moment from 'moment';

import Auth from './auth';

export default class Server {
  constructor (opts) {
    this.opts = opts;
  }
  start () {
    const app = express();
    const port = this.opts.port || 8085;

    app.listen(port);
    console.log(`Started on port ${port}`);

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.resolve('src/static')));
    app.use(express.static(path.resolve('lib/client')));

    app.use(passport.initialize());
    app.use(passport.session());

    (new Auth(app)).setup();

    app.get('/api/check-auth', Auth.check, (req, res) => {
      res.send({
        success: true,
        message: 'Test',
        time: res.locals.requestTime / 1000,
        decoded: res.locals.decoded,
      });
    });

    app.post('/api/bots/list', Auth.check, (req, res) => {
      const chatbots = [
        {
          name: 'MaffBot',
          slug: 'maffbot',
          created: parseInt(moment('2017-04-04T17:53:54+01:00').valueOf(), 10),
          description: 'The best chatbot ever. It doesn\'t do anything, mind.',
        },
        {
          name: 'HarryBot',
          slug: 'harrybot',
          created: parseInt(moment('2017-04-02T10:46:35+01:00').valueOf(), 10),
          description: 'Harrybot is a very simple chatscript bot that seems to get very confused.',
        },
        {
          name: 'TanBot',
          slug: 'tanbot',
          created: parseInt(moment('2017-03-28T12:12:18+01:00').valueOf(), 10),
          description: 'Currency conversion for those trans-global jetsetters.',
        },
      ];
      res.send({
        chatbots,
        success: true,
      });
    });

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('src/static/index.html'));
    });
  }
}

