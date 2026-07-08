const taskService = require('../../src/domain/taskService');

describe('taskService - création', () => {
  beforeEach(() => {
    taskService.resetTasks();
  });

  test('une tâche valide est créée avec id et done=false', () => {
    const task = taskService.createTask({ title: 'Réviser', priority: 'haute', dueDate: '2026-07-10' });

    expect(task).toMatchObject({
      id: 1,
      title: 'Réviser',
      priority: 'haute',
      dueDate: '2026-07-10',
      done: false,
    });
  });

  test('une tâche sans titre est refusée', () => {
    expect(() => taskService.createTask({ title: '' })).toThrow('Le titre est obligatoire');
  });

  test('une tâche avec titre espaces est refusée', () => {
    expect(() => taskService.createTask({ title: '   ' })).toThrow('Le titre est obligatoire');
  });

  test('une priorité invalide est refusée', () => {
    expect(() => taskService.createTask({ title: 'Test', priority: 'urgente' })).toThrow(
      'Priorité invalide : urgente'
    );
  });

  test('une date invalide est refusée', () => {
    expect(() => taskService.createTask({ title: 'Test', dueDate: 'pas-une-date' })).toThrow(
      "Date d'échéance invalide"
    );
  });
});

describe('taskService - retard', () => {
  beforeEach(() => {
    taskService.resetTasks();
  });

  const now = new Date('2026-07-05T12:00:00Z');

  test("une tâche dont l'échéance est passée est en retard", () => {
    const task = taskService.createTask({ title: 'Rendre', dueDate: '2026-07-01' });
    expect(taskService.isLate(task, now)).toBe(true);
  });

  test("une tâche avec échéance future n'est pas en retard", () => {
    const task = taskService.createTask({ title: 'Rendre', dueDate: '2026-08-01' });
    expect(taskService.isLate(task, now)).toBe(false);
  });

  test("une tâche terminée n'est jamais en retard", () => {
    const task = taskService.createTask({ title: 'Rendre', dueDate: '2026-07-01' });
    taskService.completeTask(task.id);
    expect(taskService.isLate(task, now)).toBe(false);
  });

  test("une tâche sans échéance n'est pas en retard", () => {
    const task = taskService.createTask({ title: 'Sans échéance' });
    expect(taskService.isLate(task, now)).toBe(false);
  });
});

describe('taskService - modification et filtres', () => {
  beforeEach(() => {
    taskService.resetTasks();
  });

  test('updateTask modifie le titre, la priorité et la date', () => {
    const task = taskService.createTask({ title: 'Ancien', priority: 'basse', dueDate: null });
    const updated = taskService.updateTask(task.id, { title: 'Nouveau', priority: 'haute', dueDate: '2026-07-10' });

    expect(updated.title).toBe('Nouveau');
    expect(updated.priority).toBe('haute');
    expect(updated.dueDate).toBe('2026-07-10');
  });

  test('updateTask sur tâche inexistante lève une erreur', () => {
    expect(() => taskService.updateTask(999, { title: 'X' })).toThrow('Tâche introuvable');
  });

  test('filterByStatus("terminee") renvoie uniquement les terminées', () => {
    taskService.createTask({ title: 'En cours' });
    const done = taskService.createTask({ title: 'Finie' });
    taskService.completeTask(done.id);

    const result = taskService.filterByStatus('terminee');
    expect(result).toHaveLength(1);
    expect(result[0].done).toBe(true);
  });

  test('filterByStatus statut inconnu lève une erreur', () => {
    expect(() => taskService.filterByStatus('archivee')).toThrow('Statut inconnu : archivee');
  });
});

