const Task = require('../models/Task');

// @desc    Get all tasks for current user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
  res.json(tasks);
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status: status || 'Pending',
    userId: req.user.id,
  });

  res.status(201).json(task);
};

// @desc    Update task status
// @route   PUT /api/tasks/:id
// @access  Private
const updateTaskStatus = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.userId !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  task.status = req.body.status || task.status;
  await task.save();

  res.json(task);
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.userId !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await task.destroy();
  res.json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTaskStatus, deleteTask };
