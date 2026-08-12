/**
 * Auth middleware for Max Guru backend.
 * Requires X-Max-Api-Key header matching MAX_API_KEY env var.
 * Set MAX_API_KEY in Railway environment variables.
 */
function requireApiKey(req, res, next) {
  if (!process.env.MAX_API_KEY) {
    console.error('FATAL: MAX_API_KEY env var not set');
    return res.status(500).json({ error: 'Server not configured' });
  }
  const key = req.headers['x-max-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (!key || key !== process.env.MAX_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

module.exports = { requireApiKey };
