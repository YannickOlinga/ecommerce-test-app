const { calculateShipping } = require('../../src/domain/shipping');

describe('calculateShipping', () => {
  test('retourne 0 pour un poids nul', () => {
    expect(calculateShipping(0)).toBe(0);
  });

  test('retourne 4.99 pour un petit colis', () => {
    expect(calculateShipping(1.5)).toBe(4.99);
  });

  test('retourne 9.99 pour un colis moyen', () => {
    expect(calculateShipping(5)).toBe(9.99);
  });

  test('retourne 14.99 pour un gros colis', () => {
    expect(calculateShipping(15)).toBe(14.99);
  });

  test('rejette un poids invalide', () => {
    expect(() => calculateShipping(-1)).toThrow('Poids invalide');
    expect(() => calculateShipping(undefined)).toThrow('Poids invalide');
  });
});
