import { Router } from 'express';
import { requireAuth } from '../middleware/passport-middleware';
import { createJournalEntry } from '../controllers/journal-controllers';

const JournalRoutes = Router();

/**
 * Get all journal entries
 */
JournalRoutes.get('/journals');

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
JournalRoutes.delete('/journals/:id', requireAuth);

export { JournalRoutes };
