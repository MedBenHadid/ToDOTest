const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller');
// Retrieve all categorys
router.get('/', categoryController.findAll);
// Create a new category
router.post('/', categoryController.create);
// Retrieve a single category with id
router.get('/:id', categoryController.findById);
// Update a category with id
router.put('/:id', categoryController.update);
// Delete a category with id
router.delete('/:id', categoryController.delete);
module.exports = router