import { Router } from 'express';
import { requireAuth } from '../middleware/passport-middleware';
import {
  createJournalEntry,
  getJournalEntries,
  deleteJournalEntry
} from '../controllers/journal-controllers';

const JournalRoutes = Router();

/**
 * Get all journal entries
 */
JournalRoutes.get('/journals', getJournalEntries);

/**
 * Create journal entry
 */
JournalRoutes.post('/journals', requireAuth, createJournalEntry);

/**
 * Edit a journal entry
 */
JournalRoutes.put('/journals/:id', requireAuth);

/**
 * Delete a journal entry
 */
JournalRoutes.delete('/journals/:id', requireAuth, deleteJournalEntry);

export { JournalRoutes };
