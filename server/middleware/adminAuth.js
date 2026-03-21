// Simple admin key middleware
// Set ADMIN_SECRET in your .env file
module.exports = (req, res, next) => {
  const key = req.headers['x-admin-key'] || req.query.adminKey;
  if (!key || key !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized. Admin key required." });
  }
  next();
};