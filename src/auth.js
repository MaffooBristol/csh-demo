import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'; // Leave this until later

const LocalStrategy = passportLocal.Strategy;

const secretPhrase = 'Super secret phrase';

export default class Auth {
  constructor (app) {
    this.app = app;
  }
  setup () {
    passport.serializeUser((user, done) => {
      done(null, user.username);
    });
    passport.deserializeUser((username, done) => {
      done(null, { username: 'test', password: 'password' });
    });

    passport.use('local-login', new LocalStrategy({
      session: false,
      passReqToCallback: true,
    }, (req, username, password, done) => {
      if (username === 'test' && password === 'password') {
        const token = jwt.sign({ sub: username }, secretPhrase, { expiresIn: 1200 });
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
        return res.json({ token });
      })(req, res, next);
    });

    return this;
  }
  static check (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const requestTime = Date.now();
    jwt.verify(token, secretPhrase, (err, decoded) => {
      if (err) {
        return res.status(401).end();
      }
      if (!decoded) {
        return res.status(401).end();
      }
      // eslint-disable-next-line no-param-reassign
      res.locals = Object.assign(res.locals, { decoded, requestTime });
      return next();
    });
    return this;
  }
}
