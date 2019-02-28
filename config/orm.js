const connection = require("./connection");

const orm = {
    selectAll(tableInput, cb) {
        let queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], (err, result) => {
            if (err) throw err;
            //console.log(result);
            cb(result);
        });
    },

    insertOne(burgerName) {
        let queryString = "INSERT INTO burgers (name, devoured) VALUES (?, 0)";
        connection.query(queryString, [burgerName], (err, result) => {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
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