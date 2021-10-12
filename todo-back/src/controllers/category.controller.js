'use strict';
const Category = require('../models/category.model');
exports.findAll = function (req, res) {
  Category.findAll(function (err, category) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', category);
    res.send(category);
  });
};
exports.create = function (req, res) {
  const new_category = new Category(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Category.create(new_category, function (err, category) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Category added successfully!", data: category });
    });
  }
};
exports.findById = function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Category.update(req.params.id, new Category(req.body), function (err, category) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Category successfully updated' });
    });
  }
};
exports.delete = function (req, res) {
  Category.delete(req.params.id, function (err, category) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Category successfully deleted' });
  });
};