module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Error interno del servidor' });
};
