const express = require('express');
const { buildOrderPreview } = require('../domain/order-preview');

const router = express.Router();

router.post('/preview', (req, res) => {
  const body = req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body invalide' });
  }
  if (!('items' in body) || !Array.isArray(body.items)) {
    return res.status(400).json({ error: 'Panier invalide' });
  }

  try {
    const preview = buildOrderPreview(body);
    return res.status(200).json(preview);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
