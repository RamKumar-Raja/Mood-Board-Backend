const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Duplicate entry' });
  }

  // Handle Prisma errors
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }

  // Handle custom error messages
  if (err.message) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
