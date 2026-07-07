const { getPasswordStrength } = require('../../src/domain/password-strength');

describe('getPasswordStrength (TDD)', () => {
  test('retourne weak pour un mot de passe trop court', () => {
    expect(getPasswordStrength('Ab1!')).toBe('weak');
  });

  test('retourne medium pour 8 caractères avec lettre et chiffre', () => {
    expect(getPasswordStrength('abcdef12')).toBe('medium');
  });

  test('retourne medium pour un mot de passe avec majuscule et chiffre', () => {
    expect(getPasswordStrength('Abcdef12')).toBe('medium');
  });

  test('retourne strong pour 12+ caractères avec toutes les règles', () => {
    expect(getPasswordStrength('MonMotdepasse1!')).toBe('strong');
  });

  test('retourne strong pour un autre mot de passe complexe', () => {
    expect(getPasswordStrength('SuperSecret99@')).toBe('strong');
  });

  test('cas limite : exactement 12 caractères avec toutes les règles', () => {
    expect(getPasswordStrength('Aa1!aaaaaaa1')).toBe('strong');
  });
});
