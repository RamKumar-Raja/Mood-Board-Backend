import express from 'express';
import { z } from 'zod';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authMiddleware.js';
import { createTileController, updateTileController, deleteTileController } from '../controllers/tile.controller.js';

const router = express.Router();

router.use(authenticate);

const createTileSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().optional(),
  tags: z.any().optional(),
  positionX: z.number().int().optional(),
  positionY: z.number().int().optional(),
});

const updateTileSchema = z.object({
  caption: z.string().optional(),
  tags: z.any().optional(),
  positionX: z.number().int().optional(),
  positionY: z.number().int().optional(),
});

router.post('/:boardId/tiles', validate(createTileSchema), createTileController);
router.put('/:boardId/tiles/:tileId', validate(updateTileSchema), updateTileController);
router.delete('/:boardId/tiles/:tileId', deleteTileController);

export default router;
