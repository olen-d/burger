const express = require("express");

const router = express.Router();

const burger = require("./../models/burger");

router.get("/", (req, res) => {
    burger.all((data) => {
        let hbsObj = {
            burgers : data
        };
        //console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.get("/api/burgers/mostRecent", (req, res) => {
    burger.mostRecent((data) => {
        res.json(data);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.create(["burger_name", "devoured"], [req.body.name, req.body.status], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/devoured/:id", (req, res) => {
    burger.update(req.params.id, "devoured", 1, (result) => {
        res.json({ changedRows: result.changedRows });
    });
});

module.exports = router;