const { isValidEmail, isValidPassword } = require('./user-validation');

async function registerUser({ email, password }, userRepository, emailService) {
  if (!isValidEmail(email)) {
    throw new Error('Email invalide');
  }
  if (!isValidPassword(password)) {
    throw new Error('Mot de passe invalide');
  }

  const user = await userRepository.create({ email, password });
  await emailService.sendWelcome(email);

  return user;
}

module.exports = { registerUser };
