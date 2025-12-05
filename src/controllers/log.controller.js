import { getLogs, addLog } from '../services/log.service.js';

export const getLogsController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { page, limit } = req.query;
    const result = await getLogs(boardId, req.user.id, parseInt(page) || 1, parseInt(limit) || 10);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addLogController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { action } = req.body;
    const log = await addLog(boardId, req.user.id, action);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
};
