import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';

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
        message: 'Test',
        time: res.locals.requestTime / 1000,
        decoded: res.locals.decoded,
      });
    });

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('src/static/index.html'));
    });
  }
}

