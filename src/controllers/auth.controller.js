import { signup, login } from '../services/auth.service.js';

export const signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await signup(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res) => {
  // Logout functionality removed with JWT
  res.json({ message: 'Logged out successfully' });
};

// JWT refresh token controller removed
