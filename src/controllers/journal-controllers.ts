import { JournalDocument, Journal } from '../schemas/journal-schema';
import { Response, NextFunction } from 'express';
import { UserDocument, User } from '../schemas/user-schema';
import { RequestHandler, IRouterHandler } from 'express-serve-static-core';

export const createJournalEntry: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const user = req.user;

  const journal: JournalDocument = new Journal({ ...req.body, user });

  try {
    const saved = await journal.save();

    const populated = await User.populate<JournalDocument>(saved, {
      path: 'user',
      select: ['id', 'email']
    });

    res.status(201).json(populated.toJSON());
  } catch (error) {
    res.status(422).send(req.body);
  }
};

export const getJournalEntries: RequestHandler = async (
  req,
  res
): Promise<Response> => {
  const { limit = 10, offset = 0 } = req.query;

  const entries = await Journal.find({}, null, {
    limit: Number(limit),
    skip: Number(offset)
  }).populate('user', ['id', 'username', 'email'], User);

  return res.json(entries);
};
