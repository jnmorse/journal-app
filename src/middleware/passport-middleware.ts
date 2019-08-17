import passport from 'passport';

import '../services/passport';

export const requireLogin = passport.authenticate('local');
