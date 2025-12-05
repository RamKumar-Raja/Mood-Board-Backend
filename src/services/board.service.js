import prisma from '../config/prisma.js';
import { generateShareId } from '../utils/generateShareId.js';

export const createBoard = async (userId, title, description, isPublic = false) => {
  const shareId = generateShareId();
  const board = await prisma.board.create({
    data: {
      userId,
      title,
      description,
      isPublic,
      shareId,
    },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      boardId: board.id,
      userId,
      action: 'Board created',
    },
  });

  return board;
};

export const getBoards = async (userId) => {
  return await prisma.board.findMany({
    where: { userId },
    include: { tiles: true },
  });
};

export const getBoardById = async (boardId, userId) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: { tiles: true, activityLogs: true },
  });
  if (!board) throw new Error('Board not found');
  if (board.userId !== userId && !board.isPublic) throw new Error('Unauthorized');
  return board;
};

export const updateBoard = async (boardId, userId, updates) => {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  const updatedBoard = await prisma.board.update({
    where: { id: boardId },
    data: updates,
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      boardId,
      userId,
      action: 'Board updated',
    },
  });

  return updatedBoard;
};

export const deleteBoard = async (boardId, userId) => {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  await prisma.board.delete({ where: { id: boardId } });

  // Log activity removed since board is deleted
};
