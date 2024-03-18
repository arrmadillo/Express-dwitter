import express from 'express';
import { body } from 'express-validator';
// 로컬
import * as authController from '../controller/auth.js';
import {
  validate,
  validateSignup,
  validateLogin,
} from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', validateSignup, authController.signUp);

router.post('/login', validateLogin, authController.login);

router.post('/me', isAuth, authController.me);

export default router;
