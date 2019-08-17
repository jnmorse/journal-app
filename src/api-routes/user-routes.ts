import { Router } from 'express';

import { requireLogin, requireAuth } from '../middleware/passport-middleware';
import { signin, signup } from '../controllers/autherization';

const userRoutes = Router();

userRoutes.post('/signin', requireLogin, signin);
userRoutes.post('/signup', signup);
userRoutes.get('/current_user', requireAuth, (req, res) => {
  res.send(req.user);
});

export { userRoutes };
