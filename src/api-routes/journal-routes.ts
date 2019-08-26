import { Router } from 'express';
import { requireAuth } from '../middleware/passport-middleware';
import {
  createJournalEntry,
  getJournalEntries,
  deleteJournalEntry,
  updateJournalEntry,
  getJournalEntry
} from '../controllers/journal-controllers';

const JournalRoutes = Router();

/**
 * Get all journal entries
 */
JournalRoutes.get('/journals', getJournalEntries);

JournalRoutes.get('/journals/:id', getJournalEntry);

/**
 * Create journal entry
 */
JournalRoutes.post('/journals', requireAuth, createJournalEntry);

/**
 * Edit a journal entry
 */
JournalRoutes.put('/journals/:id', requireAuth, updateJournalEntry);

/**
 * Delete a journal entry
 */
JournalRoutes.delete('/journals/:id', requireAuth, deleteJournalEntry);

export { JournalRoutes };
