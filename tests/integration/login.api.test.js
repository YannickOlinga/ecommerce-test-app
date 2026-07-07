const request = require('supertest');
const app = require('../../src/app');

describe('POST /login', () => {
  test('connexion réussie renvoie 200 avec un token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'yannick@example.com', password: 'Motdepasse1!' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toEqual({ id: 1, email: 'yannick@example.com' });
  });

  test('mauvais mot de passe renvoie 401', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'yannick@example.com', password: 'Mauvais!' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Mot de passe incorrect');
  });

  test('utilisateur inexistant renvoie 401', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'inconnu@example.com', password: 'Motdepasse1!' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Utilisateur inexistant');
  });

  test('email manquant renvoie 400', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: 'Motdepasse1!' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email manquant');
  });

  test('mot de passe manquant renvoie 400', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'yannick@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Mot de passe manquant');
  });

  test('la réponse ne contient pas le mot de passe', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'yannick@example.com', password: 'Motdepasse1!' });

    expect(res.body.password).toBeUndefined();
    expect(JSON.stringify(res.body)).not.toContain('Motdepasse1!');
  });
});
