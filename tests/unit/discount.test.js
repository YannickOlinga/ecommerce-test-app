const { applyDiscount } = require('../../src/domain/discount');

describe('applyDiscount', () => {
  test('une remise de 10 % sur 100 retourne 90', () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });

  test('une remise de 0 % retourne le total inchangé', () => {
    expect(applyDiscount(50, 0)).toBe(50);
  });

  test('une remise de 100 % retourne 0', () => {
    expect(applyDiscount(80, 100)).toBe(0);
  });

  test('une remise négative déclenche une erreur', () => {
    expect(() => applyDiscount(100, -5)).toThrow('Remise invalide');
  });

  test('une remise supérieure à 100 déclenche une erreur', () => {
    expect(() => applyDiscount(100, 101)).toThrow('Remise invalide');
  });
});
