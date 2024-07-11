'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/informer', function (req, res, next) { //เพิ่มข้อมูล-ชื่อ/นามสกุล/username/password/เบอร์โทร/บทบาท('teacher','student')
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute(`INSERT INTO informer_tb (name, surname, tel, username, password, role) VALUES (?, ?, ?, ?, ?, ?);`,
        [req.body.name, req.body.surname, req.body.tel, req.body.username, mypass, req.body.role])
        .then(() => {
            console.log('Insertion successful');
            res.status(201).send("Insert Successfully");
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Failed to insert.");
            res.end();
        });
});

wrRoute.get('/informer', function (req, res, next) {
    connection.execute('SELECT * FROM informer_tb;')
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});

wrRoute.post('/check', function (req, res, next) {
    connection.execute('SELECT * FROM informer_tb WHERE name=? AND surname=?;',
        [req.body.name, req.body.surname]).then((result) => {
            var data = result[0];
            if (data.length === 0) {
                res.sendStatus(400);
            }
            else {
                res.sendStatus(200);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);
        });
});


wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;