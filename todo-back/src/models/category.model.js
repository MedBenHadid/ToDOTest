'use strict';
var dbConn = require('./../../config/db.config');

var Category = function (category) {
  this.id = category.id;
  this.title = category.title;
  this.description = category.description;


};
Category.create = function (newCategory, result) {
  dbConn.query("INSERT INTO category set ?", newCategory, function (err, res) {
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
Category.findById = function (id, result) {
  dbConn.query("Select * from category where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Category.findAll = function (result) {
  dbConn.query("Select * from category", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('categorys : ', res);
      result(null, res);
    }
  });
};
Category.update = function (id, category, result) {
  dbConn.query("UPDATE category SET  title=?,description=? WHERE id = ?",
    [category.title, category.description, id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};
Category.delete = function (id, result) {
  dbConn.query("DELETE FROM category WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = Category;