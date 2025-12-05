const authenticate = (req, res, next) => {
  // Simple authentication - userId can be passed in headers or body
  const userId = req.headers['x-user-id'] || req.body.userId;

  // if (!userId) {
  //   return res.status(401).json({ error: 'User ID required' });
  // }

  req.user = { id: userId };
  next();
};

export default authenticate;
