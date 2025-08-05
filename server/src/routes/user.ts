import { Router } from 'express';
import { isAuthenticated, validate } from '../utils/middleware';
import { UserRegistrationSchema } from '../models/user';
import * as usersController from '../controllers/users';

const usersRouter = Router();

// Create new user route
usersRouter.post(
  '/',
  validate(UserRegistrationSchema),
  usersController.createUser
);

// Get user from token route
usersRouter.get('/me', isAuthenticated, usersController.getUserFromToken);

// Get all users route
usersRouter.get('/', isAuthenticated, usersController.getAllUsers);

export default usersRouter;
