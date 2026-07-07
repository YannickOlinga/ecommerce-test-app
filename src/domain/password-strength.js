function getPasswordStrength(password) {
  if (!password || password.length < 8) {
    return 'weak';
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (password.length >= 12 && hasLower && hasUpper && hasDigit && hasSpecial) {
    return 'strong';
  }

  if (password.length >= 8 && hasLetter && hasDigit) {
    return 'medium';
  }

  return 'weak';
}

module.exports = { getPasswordStrength };
