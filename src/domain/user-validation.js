function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed === '' || trimmed.includes(' ')) return false;

  const atIndex = trimmed.indexOf('@');
  if (atIndex <= 0) return false;

  const domain = trimmed.slice(atIndex + 1);
  if (!domain.includes('.')) return false;

  return true;
}

function isValidPassword(password) {
  if (!password || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

module.exports = { isValidEmail, isValidPassword };
