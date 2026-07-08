const request = require('supertest');
const app = require('../../src/app');
const taskService = require('../../src/domain/taskService');

describe('API /api/tasks', () => {
  beforeEach(() => {
    taskService.resetTasks();
  });

  test('POST /api/tasks crée une tâche et renvoie 201', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Acheter du pain', priority: 'basse', dueDate: '2026-07-10' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      title: 'Acheter du pain',
      priority: 'basse',
      dueDate: '2026-07-10',
      done: false,
    });
  });

  test('POST /api/tasks sans titre renvoie 400', async () => {
    const res = await request(app).post('/api/tasks').send({ priority: 'haute' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Le titre est obligatoire' });
  });

  test('POST /api/tasks avec priorité invalide renvoie 400', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Test', priority: 'urgente' });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Priorité invalide');
  });

  test('GET /api/tasks renvoie la liste des tâches', async () => {
    await request(app).post('/api/tasks').send({ title: 'Tâche 1' });
    await request(app).post('/api/tasks').send({ title: 'Tâche 2', priority: 'haute' });

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toMatchObject({ title: 'Tâche 1', done: false });
  });

  test('GET /api/tasks?status=terminee filtre les tâches terminées', async () => {
    await request(app).post('/api/tasks').send({ title: 'En cours' });
    const created = await request(app).post('/api/tasks').send({ title: 'À finir' });
    await request(app).patch(`/api/tasks/${created.body.id}/done`);

    const res = await request(app).get('/api/tasks?status=terminee');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].done).toBe(true);
  });

  test('GET /api/tasks?status=inconnu renvoie 400', async () => {
    const res = await request(app).get('/api/tasks?status=inconnu');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Statut inconnu');
  });

  test('PUT /api/tasks/:id modifie une tâche', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'Ancien', priority: 'basse' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Nouveau', priority: 'haute', dueDate: '2026-07-10' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'Nouveau', priority: 'haute', dueDate: '2026-07-10' });
  });

  test('PUT /api/tasks/:id sur tâche inexistante renvoie 404', async () => {
    const res = await request(app).put('/api/tasks/999').send({ title: 'X' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Tâche introuvable' });
  });

  test('PATCH /api/tasks/:id/done marque la tâche comme terminée', async () => {
    const created = await request(app).post('/api/tasks').send({ title: 'À terminer' });

    const res = await request(app).patch(`/api/tasks/${created.body.id}/done`);

    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test('PATCH /api/tasks/999/done renvoie 404', async () => {
    const res = await request(app).patch('/api/tasks/999/done');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Tâche introuvable' });
  });

  test('GET /api/tasks/late/count renvoie le nombre de tâches en retard', async () => {
    await request(app).post('/api/tasks').send({ title: 'Vieille', dueDate: '2020-01-01' });
    await request(app).post('/api/tasks').send({ title: 'Future', dueDate: '2099-01-01' });
    const done = await request(app).post('/api/tasks').send({ title: 'Terminée', dueDate: '2020-01-01' });
    await request(app).patch(`/api/tasks/${done.body.id}/done`);

    const res = await request(app).get('/api/tasks/late/count');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 1 });
  });
});

