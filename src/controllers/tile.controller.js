import { createTile, updateTile, deleteTile } from '../services/tile.service.js';

export const createTileController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { imageUrl, caption, tags, positionX, positionY, width, height } = req.body;
    const tile = await createTile(boardId, req.user.id, imageUrl, caption, tags, positionX, positionY, width, height);
    res.status(201).json(tile);
  } catch (error) {
    next(error);
  }
};

export const updateTileController = async (req, res, next) => {
  try {
    const { boardId, tileId } = req.params;
    const updates = req.body;
    const tile = await updateTile(boardId, tileId, req.user.id, updates);
    res.json(tile);
  } catch (error) {
    next(error);
  }
};

export const deleteTileController = async (req, res, next) => {
  try {
    const { boardId, tileId } = req.params;
    await deleteTile(boardId, tileId, req.user.id);
    res.json({ message: 'Tile deleted successfully' });
  } catch (error) {
    next(error);
  }
};
