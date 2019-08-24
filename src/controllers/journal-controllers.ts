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

  try {
    const saved = await journal.save();

    const populated = await User.populate<JournalDocument>(saved, {
      path: 'user'
    });

    const { id, title, body, created, updated, user } = populated;

    res
      .status(201)
      .json({
        id,
        title,
        body,
        created,
        updated,
        user: { id: user.id, email: user.email }
      });
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
  }).populate('user', null, User);

  if (entries.length) {
    const tD = entries.map(({ user, id, title, created, updated, body }) => {
      console.log('user', user);
      if (user instanceof Object) {
        return {
          user: { id: user.id, email: user.email },
          id,
          title,
          created,
          updated,
          body
        };
      }

      return { id, title, created, updated, body, user };
    });

    console.log(tD);

    return res.json(tD);
  }

  return res.json(entries);
}
