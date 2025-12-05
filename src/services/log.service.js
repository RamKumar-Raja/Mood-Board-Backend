import prisma from '../config/prisma.js';

export const getLogs = async (boardId, userId, page = 1, limit = 10) => {
  // Check if board exists and user has access
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new Error('Unauthorized');

  const skip = (page - 1) * limit;
  const logs = await prisma.activityLog.findMany({
    where: { boardId },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await prisma.activityLog.count({ where: { boardId } });

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const addLog = async (boardId, userId, action) => {
  return await prisma.activityLog.create({
    data: {
      boardId,
      userId,
      action,
    },
  });
};
