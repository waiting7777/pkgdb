var Quickmove = require('../lib/db_quickmove');
var Chargemove = require('../lib/db_chargemove');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var temp_quick;
    Quickmove.find({}, {  _id : 0, __v : 0 }).exec()
    .then(function(quickmoves){
        temp_quick = quickmoves;
        return Chargemove.find({}, { _id : 0, __v : 0})
    })
    .then(function(chargemoves){
        console.log(chargemoves)
        res.render('skill_index', {quicks : temp_quick, charges : chargemoves});
    });

});

router.get('/quick', function(req, res, next){
    Quickmove.find({}, { _id : 0, __v : 0}).exec()
    .then(function(quickmoves){
        res.render('quick_index', {quicks : quickmoves});
    });
});

router.get('/charge', function(req, res, next){
    Chargemove.find({}, { _id : 0, __v : 0}).exec()
    .then(function(chargemoves){
        res.render('charge_index', {charges : chargemoves});
    });
});

module.exports = router;
