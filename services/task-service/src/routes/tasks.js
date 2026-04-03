 
const express = require('express');
const router  = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/',     getTasks);
router.post('/',    createTask);
router.put('/:id',  updateTask);
router.delete('/:id', deleteTask);
// Public routes for scheduler service — no auth needed
router.get('/overdue', async (req, res) => {
  try {
    const Task = require('../models/Task');
    const today = new Date(); today.setHours(0,0,0,0);
    const tasks = await Task.find({ done: false, dueDate: { $lt: today } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/due-today', async (req, res) => {
  try {
    const Task = require('../models/Task');
    const start = new Date(); start.setHours(0,0,0,0);
    const end   = new Date(); end.setHours(23,59,59,999);
    const tasks = await Task.find({ done: false, dueDate: { $gte: start, $lte: end } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;