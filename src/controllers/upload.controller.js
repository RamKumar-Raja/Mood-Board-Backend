import multer from 'multer';
import { uploadImage, uploadMultipleImages, deleteImage } from '../services/upload.service.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImageController = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const result = await uploadImage(req.file.buffer);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
];

export const uploadMultipleImagesController = [
  upload.array('images', 10), // Allow up to 10 images at once
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
      const results = await uploadMultipleImages(req.files.map(file => file.buffer));
      res.json({ images: results });
    } catch (error) {
      next(error);
    }
  }
];

export const deleteImageController = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    await deleteImage(public_id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};
