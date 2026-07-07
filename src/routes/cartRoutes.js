const express = require('express');
const { calculateCartTotal } = require('../domain/cart');

const router = express.Router();

router.post('/total', (req, res) => {
  const body = req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Body invalide' });
  }
  if (!('items' in body)) {
    return res.status(400).json({ error: 'Propriété items manquante' });
  }
  if (!Array.isArray(body.items)) {
    return res.status(400).json({ error: 'Propriété items incorrecte' });
  }

  try {
    const total = calculateCartTotal(body.items);
    return res.status(200).json({ total: Number(total.toFixed(2)) });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
