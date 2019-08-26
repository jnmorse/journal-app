import { JournalDocument, Journal } from '../schemas/journal-schema';
import { Response, NextFunction, RequestHandler, Request } from 'express';
import { User } from '../schemas/user-schema';

export const createJournalEntry: RequestHandler = async (
  req: Request,
  res: Response
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

export async function deleteJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (req.user) {
    const deleted = await Journal.deleteOne({ _id: req.params.id });

    if (deleted.ok) {
      return res.sendStatus(200);
    }

    return res.sendStatus(422);
  }

  return next('Not logged in');
}

export async function updateJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (req.user) {
    const id = req.params.id;

    const updated = await Journal.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id
      },
      req.body
    );

    if (updated) {
      return res.sendStatus(200);
    }

    return res.sendStatus(422);
  }

  return next('something went wrong');
}
