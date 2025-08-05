import Router from 'express';
import * as authController from '../controllers/auth';
import { validate } from '../utils/middleware';
import { UserLoginSchema } from '../models/user';

const authRouter = Router();

// Login route
authRouter.post('/', validate(UserLoginSchema), authController.login);

// Refresh token route
authRouter.post('/refresh', authController.refresh);

// Logout route
authRouter.post('/logout', authController.logout);

export default authRouter;
