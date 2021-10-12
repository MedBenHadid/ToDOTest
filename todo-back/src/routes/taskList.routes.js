const express = require('express')
const router = express.Router()
const taskListController = require('../controllers/taskList.controller');
// Retrieve all taskLists
router.get('/', taskListController.findAll);
// Create a new taskList
router.post('/', taskListController.create);
// Retrieve a single taskList with id
router.get('/:id', taskListController.findById);
// Retrieve a single taskList with CatId
router.get('/TaskListCat/:idCat', taskListController.findByCatId);
// Update a taskList with id
router.put('/:id', taskListController.update);
// Delete a taskList with id
router.delete('/:id', taskListController.delete);
module.exports = router