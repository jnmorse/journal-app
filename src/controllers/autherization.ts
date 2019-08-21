import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import { User, UserDocument } from '../schemas/user-schema';

export const currentUser = (req: Request, res: Response): void | Response => {
  const user: UserDocument | undefined = req.user;

  if (user) {
    return res.json({
      id: user.id,
      email: user.email,
      created: user.created,
      updated: user.updated
    });
  }

  return res.send(false);
};

export const signin = (req: Request, res: Response): void => {
  if (!req.user) {
    return res.redirect('/signin');
  }
  return res.redirect('/');
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  if (!req.body.email || !req.body.password) {
    return next('email and/or password are missing');
  }

  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const newUser = new User({ email, password });

    const saved = await newUser.save();

    if (saved) {
      return res.status(201).send(saved);
    }

    return next('Was unable to save User');
  } catch (error) {
    return next(error);
  }
};
