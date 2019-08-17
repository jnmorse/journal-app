import { Router } from 'express';

import { requireLogin } from '../middleware/passport-middleware';
import { signin, signup } from '../controllers/autherization';

const userRoutes = Router();

userRoutes.post('/signin', requireLogin, signin);
userRoutes.post('/signup', signup);

export { userRoutes };
