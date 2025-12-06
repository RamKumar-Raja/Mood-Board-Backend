import express from 'express';
import { z } from 'zod';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authMiddleware.js';
import { createBoardController, getBoardsController, getBoardByIdController, updateBoardController, deleteBoardController, getBoardByShareIdController, getPublicBoardsController } from '../controllers/board.controller.js';

const router = express.Router();

const createBoardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
});

const updateBoardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
});

// Public routes
router.get('/public', getPublicBoardsController);
router.get('/share/:shareId', getBoardByShareIdController);

// Protected routes
router.use(authenticate);

router.post('/', validate(createBoardSchema), createBoardController);
router.get('/', getBoardsController);
router.get('/:boardId', getBoardByIdController);
router.put('/:boardId', validate(updateBoardSchema), updateBoardController);
router.delete('/:boardId', deleteBoardController);

export default router;
