const connection = require("./connection");

const helpers = {
    printQuestionMarks(num) {
    let arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
}

const orm = {
    selectAll(tableInput, cb) {
        let queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${helpers.printQuestionMarks(vals.length)});`;

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    selectMostRecent(tableInput, cb) {
        let queryString = "SELECT * FROM ?? WHERE id = LAST_INSERT_ID()";

        connection.query(queryString, [tableInput], (err, result) => {
            if (err) throw err;
            cb(result);
       })
    },

    updateOne(id) {
        let queryString = "UPDATE burgers SET devoured = 1 WHERE id = ?";
        connection.query(queryString, [id], (err, result) => {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    }
}

module.exports = orm;