import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserDocument } from '../schemas/user-schema';

import 'dotenv/config';

passport.serializeUser<UserDocument, string>((user, done) => {
  if (user) {
    done(null, user.id);
  }
});

passport.deserializeUser<UserDocument, string>(
  async (id, done): Promise<void> => {
    try {
      const user = await User.findById(id);
      if (user) {
        return done(null, user);
      }

      return done('user not found');
    } catch (error) {
      return done(error);
    }
  }
);

const localLogin: LocalStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isPasswordOkay = user.comparePassword(password);

      if (isPasswordOkay) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

passport.use('local', localLogin);
