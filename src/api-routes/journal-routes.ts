import { Router } from 'express';
import { requireAuth } from 'src/middleware/passport-middleware';

const JournalRoutes = Router();

JournalRoutes.post('/journals', requireAuth);
JournalRoutes.get('/journals');

export { JournalRoutes };
