const express = require('express');
const taskService = require('../domain/taskService');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    if (req.query.status) {
      return res.json(taskService.filterByStatus(req.query.status));
    }
    return res.json(taskService.getTasks());
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/late/count', (req, res) => {
  return res.json({ count: taskService.countLateTasks() });
});

router.post('/', (req, res) => {
  try {
    const task = taskService.createTask(req.body);
    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const task = taskService.updateTask(Number(req.params.id), req.body);
    return res.json(task);
  } catch (err) {
    if (err.message === 'Tâche introuvable') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/done', (req, res) => {
  try {
    const task = taskService.completeTask(Number(req.params.id));
    return res.json(task);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

module.exports = router;

