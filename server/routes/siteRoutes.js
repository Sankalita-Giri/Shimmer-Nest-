const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');

// Get a config by key
router.get('/:key', async (req, res) => {
  try {
    const config = await SiteConfig.findOne({ key: req.params.key });
    if (!config) return res.status(404).json({ message: 'Config not found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create a config
router.post('/', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'adiiibhallu') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { key, value } = req.body;
  try {
    const config = await SiteConfig.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
