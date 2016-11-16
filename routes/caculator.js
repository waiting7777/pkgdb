var Cpm = require('../lib/db_cpm');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var common = require('../lib/common');

router.get('/cpm', function(req, res, next){
    Cpm.find({}, { _id : 0, __v : 0}).exec(function(err, cpm){
        if(err) throw err;

        res.sendFile('../public/caulator.html');
        return;
    });
});

module.exports = router;
