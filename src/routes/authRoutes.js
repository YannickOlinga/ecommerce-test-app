const express = require('express');
const { findByEmail } = require('../data/users');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email manquant' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Mot de passe manquant' });
  }

  const user = findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Utilisateur inexistant' });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  return res.status(200).json({
    token: `token-${user.id}`,
    user: { id: user.id, email: user.email },
  });
});

module.exports = router;
