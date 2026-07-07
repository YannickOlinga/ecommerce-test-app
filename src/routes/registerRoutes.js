const express = require('express');
const { registerUser } = require('../domain/register-user');
const { users, findByEmail } = require('../data/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const body = req.body || {};
  const email = body.email;
  const password = body.password;

  const userRepository = {
    create: async ({ email: emailToCreate, password: passwordToCreate }) => {
      const existing = findByEmail(emailToCreate);
      if (existing) {
        throw new Error('Email déjà utilisé');
      }

      const user = {
        id: users.length + 1,
        email: emailToCreate,
        password: passwordToCreate,
      };
      users.push(user);
      return user;
    },
  };

  const emailService = {
    sendWelcome: async () => true,
  };

  try {
    const user = await registerUser({ email, password }, userRepository, emailService);
    // On ne renvoie jamais le mot de passe.
    return res.status(200).json({ user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;

