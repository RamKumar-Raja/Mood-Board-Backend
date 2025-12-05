import express from 'express';
import { z } from 'zod';
import validate from '../middleware/validate.js';
import authenticate from '../middleware/authMiddleware.js';
import { getLogsController, addLogController } from '../controllers/log.controller.js';

const router = express.Router();

router.use(authenticate);

const addLogSchema = z.object({
  action: z.string().min(1),
});

router.get('/:boardId/logs', getLogsController);
router.post('/:boardId/logs', validate(addLogSchema), addLogController);

export default router;
