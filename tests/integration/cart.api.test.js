const request = require('supertest');
const app = require('../../src/app');

describe('POST /cart/total', () => {
  test('calcule correctement un panier valide', async () => {
    const res = await request(app)
      .post('/cart/total')
      .send({
        items: [
          { price: 10, quantity: 2 },
          { price: 5.5, quantity: 1 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(25.5);
  });

  test('retourne 0 pour un panier vide', async () => {
    const res = await request(app).post('/cart/total').send({ items: [] });

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(0);
  });

  test('prend en compte les quantités', async () => {
    const res = await request(app)
      .post('/cart/total')
      .send({ items: [{ price: 9.99, quantity: 3 }] });

    expect(res.status).toBe(200);
    expect(res.body.total).toBeCloseTo(29.97);
  });

  test('gère les prix décimaux', async () => {
    const res = await request(app)
      .post('/cart/total')
      .send({ items: [{ price: 4.99, quantity: 2 }] });

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(9.98);
  });

  test('rejette un body invalide', async () => {
    const res = await request(app).post('/cart/total').send([]);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Body invalide');
  });

  test('rejette un items manquant', async () => {
    const res = await request(app).post('/cart/total').send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Propriété items manquante');
  });

  test('rejette un items incorrect', async () => {
    const res = await request(app).post('/cart/total').send({ items: 'abc' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Propriété items incorrecte');
  });
});
