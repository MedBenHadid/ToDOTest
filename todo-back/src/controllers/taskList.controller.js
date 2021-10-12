'use strict';
const TaskList = require('../models/taskList.model');
exports.findAll = function (req, res) {
  TaskList.findAll(function (err, taskList) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', taskList);
    res.send(taskList);
  });
};
exports.create = function (req, res) {
  console.log(req.body)
  const new_taskList = new TaskList(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    TaskList.create(new_taskList, function (err, taskList) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "TaskList added successfully!", data: taskList });
    });
  }
};
exports.findByCatId = function (req, res) {

  TaskList.findByCatId(req.params.idCat, function (err, taskList) {
    if (err)
      res.send(err);
    res.json(taskList);
  });
};
exports.findById = function (req, res) {
  TaskList.findById(req.params.id, function (err, taskList) {
    if (err)
      res.send(err);
    res.json(taskList);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    TaskList.update(req.params.id, new TaskList(req.body), function (err, taskList) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'TaskList successfully updated' });
    });
  }
};
exports.delete = function (req, res) {
  TaskList.delete(req.params.id, function (err, taskList) {
    console.log(req.params.id)
    if (err)
      res.send(err);
    res.json({ error: false, message: 'TaskList successfully deleted' });
  });
};