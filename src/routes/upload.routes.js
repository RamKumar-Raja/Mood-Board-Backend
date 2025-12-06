import express from 'express';
import { uploadImageController, uploadMultipleImagesController, deleteImageController } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/image', ...uploadImageController);
router.post('/images', ...uploadMultipleImagesController);
router.delete('/image/:public_id', deleteImageController);

export default router;
