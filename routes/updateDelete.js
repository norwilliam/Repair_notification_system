'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/informer/:uid', function (req, res, next) {
    connection.execute("UPDATE informer_tb SET name=?, surname=?, tel=? WHERE id=?;",
        [req.body.name, req.body.surname, req.body.tel, req.params.uid])
        .then(() => {
            console.log('Update successful');
            res.status(200).send("Update Successfully.");
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Failed to update.");
        });
});

udRoute.delete('/informer/:uid', function (req, res, next) {
    connection.execute("DELETE FROM informer_tb WHERE id=?;",
        [req.params.uid])
        .then(() => {
            console.log('ok');
            res.status(200).send("Delete Successfully.");
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Failed to delete.");
        });
    res.end();
});

udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
})

module.exports = udRoute;