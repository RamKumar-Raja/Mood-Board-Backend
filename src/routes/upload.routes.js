import express from 'express';
import { uploadImageController, deleteImageController } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/image', ...uploadImageController);
router.delete('/image/:public_id', deleteImageController);

export default router;
