const { calculateCartTotal } = require('../../src/domain/cart');

describe('calculateCartTotal', () => {
  test('calcule le total avec plusieurs produits', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    expect(calculateCartTotal(items)).toBe(25);
  });

  test('retourne 0 pour un panier vide', () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  test('prend en compte les quantités', () => {
    const items = [{ price: 9.99, quantity: 3 }];
    expect(calculateCartTotal(items)).toBeCloseTo(29.97);
  });

  test('gère les prix décimaux', () => {
    const items = [{ price: 4.5, quantity: 2 }];
    expect(calculateCartTotal(items)).toBe(9);
  });

  test('un produit avec quantité 0 n\'augmente pas le total', () => {
    const items = [
      { price: 10, quantity: 0 },
      { price: 5, quantity: 1 },
    ];
    expect(calculateCartTotal(items)).toBe(5);
  });

  test('rejette un items non tableau', () => {
    expect(() => calculateCartTotal(null)).toThrow('Items invalides');
  });

  test('rejette un article invalide', () => {
    expect(() => calculateCartTotal([{ price: '10', quantity: 1 }])).toThrow('Article invalide');
  });
});
