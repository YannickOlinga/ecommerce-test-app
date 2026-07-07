const { isValidEmail, isValidPassword } = require('../../src/domain/user-validation');

describe('isValidEmail', () => {
  test('accepte un email valide', () => {
    expect(isValidEmail('yannick@example.com')).toBe(true);
  });

  test('refuse un email sans @', () => {
    expect(isValidEmail('yannickexample.com')).toBe(false);
  });

  test('refuse un email sans domaine', () => {
    expect(isValidEmail('yannick@')).toBe(false);
  });

  test('refuse un email vide', () => {
    expect(isValidEmail('')).toBe(false);
  });

  test('refuse un email avec espaces', () => {
    expect(isValidEmail('yan nick@example.com')).toBe(false);
  });
});

describe('isValidPassword', () => {
  test('accepte un mot de passe valide', () => {
    expect(isValidPassword('Motdepasse1!')).toBe(true);
  });

  test('refuse un mot de passe trop court', () => {
    expect(isValidPassword('Ab1!')).toBe(false);
  });

  test('refuse un mot de passe sans majuscule', () => {
    expect(isValidPassword('motdepasse1!')).toBe(false);
  });

  test('refuse un mot de passe sans chiffre', () => {
    expect(isValidPassword('Motdepasse!')).toBe(false);
  });

  test('refuse un mot de passe sans caractère spécial', () => {
    expect(isValidPassword('Motdepasse1')).toBe(false);
  });
});
