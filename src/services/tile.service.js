import prisma from '../config/prisma.js';

export const createTile = async (boardId, userId, imageUrl, caption, tags, positionX, positionY, width, height) => {
  // Check if board exists and user has access
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  const tile = await prisma.tile.create({
    data: {
      boardId,
      imageUrl,
      caption,
      tags: tags || [],
      positionX: positionX || 0,
      positionY: positionY || 0,
      width: width || 200,
      height: height || 200,
    },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      boardId,
      userId,
      action: 'Tile created',
    },
  });

  return tile;
};

export const updateTile = async (boardId, tileId, userId, updates) => {
  // Check if board exists and user has access
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  const tile = await prisma.tile.findUnique({ where: { id: tileId } });
  if (!tile || tile.boardId !== boardId) throw new Error('Tile not found');

  const updatedTile = await prisma.tile.update({
    where: { id: tileId },
    data: updates,
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      boardId,
      userId,
      action: 'Tile updated',
    },
  });

  return updatedTile;
};

export const deleteTile = async (boardId, tileId, userId) => {
  // Check if board exists and user has access
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  const tile = await prisma.tile.findUnique({ where: { id: tileId } });
  if (!tile || tile.boardId !== boardId) throw new Error('Tile not found');

  await prisma.tile.delete({ where: { id: tileId } });

  // Log activity
  await prisma.activityLog.create({
    data: {
      boardId,
      userId,
      action: 'Tile deleted',
    },
  });
};
