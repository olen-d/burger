const orm = require("../config/orm");

const burger = {
    all (cb) {
      orm.selectAll("burgers", (res) => {
        cb(res);
      });
    },

    mostRecent (cb) {
      orm.selectMostRecent("burgers", res => {
        cb(res);
      });
    },

    // The variables cols and vals are arrays.
    create (cols, vals, cb) {
      orm.insertOne("burgers", cols, vals, (res) => {
        cb(res);
      });
    },

    update (id, cb) {
      orm.updateOne(id, (res) => {
        cb(res);
      });
    }
  };
  
  // Export the database functions for the controller (catsController.js).
  module.exports = burger;
  