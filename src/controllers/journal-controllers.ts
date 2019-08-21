import { JournalDocument, Journal } from '../schemas/journal-schema';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from 'src/schemas/user-schema';

export async function createJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user: UserDocument = req.user;

  const journal: JournalDocument = new Journal(req.body);

  try {
    const saved = await journal.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(422).send(req.body);
  }
}

export async function getJournalEntries(
  req: Request,
  res: Response
): Promise<void> {
  const { limit = 10, offset = 0 } = req.query;
  const entries = await Journal.find({}, null, {
    limit: Number(limit),
    skip: Number(offset)
  });

  res.json(entries);
}
