const PRIORITES_AUTORISEES = ['basse', 'normale', 'haute'];

let tasks = [];
let nextId = 1;

function resetTasks() {
  tasks = [];
  nextId = 1;
}

function createTask({ title, priority = 'normale', dueDate = null } = {}) {
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Le titre est obligatoire');
  }
  if (!PRIORITES_AUTORISEES.includes(priority)) {
    throw new Error(`Priorité invalide : ${priority}`);
  }
  if (dueDate !== null && dueDate !== undefined && isNaN(Date.parse(dueDate))) {
    throw new Error("Date d'échéance invalide");
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    priority,
    dueDate: dueDate ?? null,
    done: false,
  };

  tasks.push(task);
  return task;
}

function getTasks() {
  return tasks;
}

function filterByStatus(status) {
  if (status === 'terminee') return tasks.filter((t) => t.done);
  if (status === 'en-cours') return tasks.filter((t) => !t.done);
  throw new Error(`Statut inconnu : ${status}`);
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function updateTask(id, changes = {}) {
  const task = getTaskById(id);
  if (!task) {
    throw new Error('Tâche introuvable');
  }

  if ('title' in changes) {
    if (!changes.title || typeof changes.title !== 'string' || changes.title.trim() === '') {
      throw new Error('Le titre est obligatoire');
    }
    task.title = changes.title.trim();
  }

  if ('priority' in changes) {
    if (!PRIORITES_AUTORISEES.includes(changes.priority)) {
      throw new Error(`Priorité invalide : ${changes.priority}`);
    }
    task.priority = changes.priority;
  }

  if ('dueDate' in changes) {
    if (changes.dueDate !== null && changes.dueDate !== undefined && isNaN(Date.parse(changes.dueDate))) {
      throw new Error("Date d'échéance invalide");
    }
    task.dueDate = changes.dueDate ?? null;
  }

  return task;
}

function completeTask(id) {
  const task = getTaskById(id);
  if (!task) {
    throw new Error('Tâche introuvable');
  }
  task.done = true;
  return task;
}

function isLate(task, now = new Date()) {
  if (task.done) return false;
  if (!task.dueDate) return false;
  return new Date(task.dueDate) < now;
}

function countLateTasks(now = new Date()) {
  return tasks.filter((t) => isLate(t, now)).length;
}

module.exports = {
  PRIORITES_AUTORISEES,
  resetTasks,
  createTask,
  getTasks,
  filterByStatus,
  getTaskById,
  updateTask,
  completeTask,
  isLate,
  countLateTasks,
};

