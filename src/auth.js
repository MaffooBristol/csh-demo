import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const localStrategy = passportLocal.Strategy;

export default class Auth {
  constructor (app) {
    this.app = app;
    this.setup();
  }
  setup () {
    passport.serializeUser((user, done) => {
      done(null, user.username);
    });
    passport.deserializeUser((username, done) => {
      done(null, { username: 'test', password: 'password' });
    });

    passport.use('local-login', new localStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
    }, (req, username, password, done) => {
      if (username === 'test' && password === 'password') {
        const token = jwt.sign({ sub: username }, 'Super secret phrase');
        done(null, token, { fullName: 'John Smith' });
      }
      else {
        done('Incorrect credentials!');
      }
    }));

    this.app.post('/login', (req, res, next) => {
      return passport.authenticate('local-login', (err, token, userData) => {
        if (err || userData.message === 'Missing credentials') {
          return res.status(400).json({
            error: err || 'Missing credentials',
          });
        }
        return res.json({
          token
        });
      })(req, res, next);
    });
  }
}
