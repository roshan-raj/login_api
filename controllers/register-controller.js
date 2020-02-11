var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../db/db_config');
cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function (req, res) {
    var today = Math.floor(new Date() / 1000);
    var dob = (new Date(req.body.dob)).getTime();
    var encryptedString = cryptr.encrypt(req.body.password);

    var users = {
        "username": req.body.username,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "dob": dob,
        "password": encryptedString,
        "timecreated": today
    }

    connection.query('SELECT email from users WHERE email = ?', [req.body.email], function (checkerror, checkresults, checkfields) {
        if (!checkresults[0]) {
            connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
                if (error) {
                    res.json({
                        status: false,
                        message: 'there are some error with query'
                    })
                } else {
                    res.json({
                        status: true,
                        data: results,
                        message: 'user registered sucessfully'
                    })
                }
            });
        }
        else {
            res.json({
                status: false,
                message: 'Email already exists'
            })
        }
    })



}
