const request = require('supertest');
const app = require('../../src/app');

describe('POST /orders/preview', () => {
  const validOrder = {
    items: [{ price: 100, quantity: 1 }],
    discountPercent: 10,
    shipping: { weightKg: 1 },
  };

  test('calcule correctement le sous-total', async () => {
    const res = await request(app).post('/orders/preview').send(validOrder);

    expect(res.status).toBe(200);
    expect(res.body.subtotal).toBe(100);
  });

  test('applique correctement la remise', async () => {
    const res = await request(app).post('/orders/preview').send(validOrder);

    expect(res.status).toBe(200);
    expect(res.body.discountedTotal).toBe(90);
  });

  test('calcule correctement les frais de livraison', async () => {
    const res = await request(app).post('/orders/preview').send(validOrder);

    expect(res.status).toBe(200);
    expect(res.body.shippingFee).toBe(4.99);
  });

  test('calcule correctement le total final', async () => {
    const res = await request(app).post('/orders/preview').send(validOrder);

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(94.99);
  });

  test('rejette une remise invalide', async () => {
    const res = await request(app)
      .post('/orders/preview')
      .send({ ...validOrder, discountPercent: 150 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Remise invalide');
  });

  test('rejette un poids invalide', async () => {
    const res = await request(app)
      .post('/orders/preview')
      .send({ ...validOrder, shipping: { weightKg: -2 } });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Poids invalide');
  });

  test('rejette un panier invalide', async () => {
    const res = await request(app)
      .post('/orders/preview')
      .send({ discountPercent: 0, shipping: { weightKg: 1 } });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Panier invalide');
  });

  test('rejette des informations de livraison manquantes', async () => {
    const res = await request(app)
      .post('/orders/preview')
      .send({ items: [{ price: 10, quantity: 1 }] });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Informations de livraison manquantes');
  });
});
