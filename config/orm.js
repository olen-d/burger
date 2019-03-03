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

    selectMostRecent(table, cb) {
        let queryString = "SELECT * FROM ?? WHERE id = LAST_INSERT_ID()";

        connection.query(queryString, [table], (err, result) => {
            if (err) throw err;
            cb(result);
       })
    },

    updateOne(table, id, col, val, cb) {
        let queryString = `UPDATE ${table} SET ${col} = ${val} WHERE id = ${id}`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;