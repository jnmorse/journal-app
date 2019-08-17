import { Router } from 'express';

import { requireLogin, requireAuth } from '../middleware/passport-middleware';
import { signin, signup, currentUser } from '../controllers/autherization';

const userRoutes = Router();

userRoutes.post('/signin', requireLogin, signin);
userRoutes.post('/signup', signup);
userRoutes.get('/current_user', requireAuth, currentUser);
userRoutes.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export { userRoutes };
