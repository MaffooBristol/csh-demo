import express from 'express';
import path from 'path';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const localStrategy = passportLocal.Strategy;
import bodyParser from 'body-parser';

import Auth from './auth.js';

export default class Server {
  constructor (opts) {
    this.opts = opts;
  }
  start () {
    const app = express();
    const port = this.opts.port || 8085;

    const server = app.listen(port);
    console.log(`Started on port ${port}`);

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.resolve('src/static')));
    app.use(express.static(path.resolve('lib/client')));

    app.use(passport.initialize());
    app.use(passport.session());

    const auth = new Auth(app);

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('src/static/index.html'));
    });

  }
}

