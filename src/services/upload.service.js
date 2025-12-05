import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (fileBuffer) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });

  return { url: result.secure_url, public_id: result.public_id };
};

export const deleteImage = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};
