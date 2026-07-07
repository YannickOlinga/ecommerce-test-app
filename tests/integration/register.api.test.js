const request = require('supertest');
const app = require('../../src/app');

describe('POST /register', () => {
  test('crée un compte et ne renvoie pas le mot de passe', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'nouveau@example.com', password: 'Motdepasse1!' });

    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({ id: expect.any(Number), email: 'nouveau@example.com' });
    expect(res.body.user.password).toBeUndefined();
  });

  test('email manquant renvoie 400', async () => {
    const res = await request(app).post('/register').send({ password: 'Motdepasse1!' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email invalide');
  });

  test('mot de passe invalide renvoie 400', async () => {
    const res = await request(app).post('/register').send({ email: 'x@y.com', password: 'abc' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Mot de passe invalide');
  });
});

