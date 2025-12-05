import { createBoard, getBoards, getBoardById, updateBoard, deleteBoard } from '../services/board.service.js';

export const createBoardController = async (req, res, next) => {
  try {
    const { title, description, isPublic } = req.body;
    const board = await createBoard(req.user.id, title, description, isPublic);
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const getBoardsController = async (req, res, next) => {
  try {
    const boards = await getBoards(req.user.id);
    res.json(boards);
  } catch (error) {
    next(error);
  }
};

export const getBoardByIdController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await getBoardById(boardId, req.user.id);
    res.json(board);
  } catch (error) {
    next(error);
  }
};

export const updateBoardController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const updates = req.body;
    const board = await updateBoard(boardId, req.user.id, updates);
    res.json(board);
  } catch (error) {
    next(error);
  }
};

export const deleteBoardController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    await deleteBoard(boardId, req.user.id);
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    next(error);
  }
};
