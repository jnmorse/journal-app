import {
  JournalDocument,
  Journal,
  journalSchema
} from '../schemas/journal-schema';
import { Request, Response, NextFunction } from 'express';
import { UserDocument, User } from '../schemas/user-schema';
import JournalEntries from 'src/client/components/JournalEntries/JournalEntries';

export async function createJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user: UserDocument = req.user;

  const journal: JournalDocument = new Journal({ ...req.body, user });
  console.log(journal.toJSON());

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
}

export async function getJournalEntries(
  req: Request,
  res: Response
): Promise<Response> {
  const { limit = 10, offset = 0 } = req.query;

  const entries = await Journal.find({}, null, {
    limit: Number(limit),
    skip: Number(offset)
  }).populate('user', ['id', 'username', 'email'], User);

  return res.json(entries);
}
