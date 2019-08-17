import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import '../services/passport';

export const requireLogin = passport.authenticate('local');
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user) {
    return next();
  }

  return next('Authentication required');
};
