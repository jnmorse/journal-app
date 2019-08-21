import { JournalDocument, Journal } from '../schemas/journal-schema';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from 'src/schemas/user-schema';

export function createJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user: UserDocument = req.user;

  const journal = new Journal(req.body);
}
