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
    orderBy: { createdAt: 'desc' }, // Using createdAt until updatedAt migration is applied
  });
};

export const getPublicBoards = async () => {
  return await prisma.board.findMany({
    where: { isPublic: true },
    include: { 
      tiles: true, // Include ALL tiles so users can see them when viewing the board
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }, // Using createdAt until updatedAt migration is applied
  });
};

export const getBoardById = async (boardId, userId) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: { tiles: true, activityLogs: { orderBy: { createdAt: 'desc' }, take: 10 } },
  });
  if (!board) throw new Error('Board not found');
  if (board.userId !== userId && !board.isPublic) throw new Error('Unauthorized');
  return board;
};

export const getBoardByShareId = async (shareId) => {
  const board = await prisma.board.findUnique({
    where: { shareId },
    include: { 
      tiles: true, 
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
  });
  if (!board) throw new Error('Board not found');
  if (!board.isPublic) throw new Error('Board is private');
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
