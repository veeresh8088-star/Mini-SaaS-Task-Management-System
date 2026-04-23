const express = require('express');
const { getTasks, createTask, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, [
    check('title', 'Title is required').not().isEmpty(),
    validate
  ], createTask);

router.route('/:id')
  .put(protect, updateTaskStatus)
  .delete(protect, deleteTask);

module.exports = router;
