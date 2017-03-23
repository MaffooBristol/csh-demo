import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bycrpt';

const localStrategy = passportLocal.Strategy;

export default class Auth {
  constructor (app) {
    super();
    this.app = app;
    this.setup();
  }
  setup () {
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user.username);
    });
    passport.unserializeUser((username, done) => {
      done(null, { username: 'test', password: 'password' });
    });

    passport.use(new localStrategy({ passReqToCallback: true }, (req, username, password, done) => {
      if (username === 'test' && password === 'password') {
        const token = jwt.sign({ sub: username }, 'Super secret phrase');
        done(null, token, { fullName: 'John Smith' });
      }
      else {
        done('Incorrect credentials!');
      }
    }));
  }
}
