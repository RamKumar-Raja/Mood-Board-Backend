import multer from 'multer';
import { uploadImage, deleteImage } from '../services/upload.service.js';

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

export const deleteImageController = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    await deleteImage(public_id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};
