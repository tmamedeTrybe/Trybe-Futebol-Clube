import { Router } from 'express';
import User from '../database/models/User';
import UserController from '../controllers/userController';
import UserService from '../services/userService';

const usersRoutes = Router();

const userController = new UserController(new UserService(User));

usersRoutes.post('/login', () => userController.login);

export default usersRoutes;
