import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import '../services/passport';

export const requireLogin = passport.authenticate('local', {
  failureRedirect: '/signin'
});

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(401);
};
