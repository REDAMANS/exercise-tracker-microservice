const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.handleUser)

router.post('/:_id/exercises', userController.handleExercise)

router.get('/:_id/logs', userController.getUserLog)

module.exports = router