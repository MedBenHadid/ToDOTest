'use strict';
var dbConn = require('./../../config/db.config');

var TaskList = function (taskList) {
  this.id = taskList.id;
  this.title = taskList.title;
  this.description = taskList.description;
  this.taskList = taskList.taskList;
  this.idCat = taskList.idCat;


};
TaskList.create = function (newTaskList, result) {
  dbConn.query("INSERT INTO taskList set ?", newTaskList, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
TaskList.findByCatId = function (idCat, result) {
  dbConn.query("Select * from taskList where idCat = ? ", idCat, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
TaskList.findById = function (id, result) {
  dbConn.query("Select * from taskList where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
TaskList.findAll = function (result) {
  dbConn.query("Select * from taskList", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('taskLists : ', res);
      result(null, res);
    }
  });
};
TaskList.update = function (id, taskList, result) {
  taskList
  dbConn.query("UPDATE taskList SET  title=?,description=?,idCat=?,taskList=? WHERE id = ?",
    [taskList.title, taskList.description, taskList.idCat, taskList.taskList, id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};
TaskList.delete = function (id, result) {
  dbConn.query("DELETE FROM taskList WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = TaskList;