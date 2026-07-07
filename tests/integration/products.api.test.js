const request = require('supertest');
const app = require('../../src/app');

describe('GET /products', () => {
  test('renvoie 200 avec une liste de produits', async () => {
    const res = await request(app).get('/products');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('chaque produit contient id, name, price et stock', async () => {
    const res = await request(app).get('/products');

    res.body.forEach((product) => {
      expect(product).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
  });

  test('les types de données sont cohérents', async () => {
    const res = await request(app).get('/products');
    const product = res.body[0];

    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.stock).toBe('number');
  });
});
