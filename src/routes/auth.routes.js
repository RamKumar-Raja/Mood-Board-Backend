import express from 'express';
import { z } from 'zod';
import validate from '../middleware/validate.js';
import { signupController, loginController, logoutController } from '../controllers/auth.controller.js';

const router = express.Router();

const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);
router.post('/logout', logoutController);

// JWT refresh token route removed

export default router;
