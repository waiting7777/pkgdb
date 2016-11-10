var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var common = require('../lib/common');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

router.get('/:id', function(req, res, next) {

    var temp = [];

    if(common.idCheck(req.params.id, 151) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    var id = parseInt(req.params.id);

    Pokemon.find({ PokemonId : id }, { _id : 0, __v : 0 }).exec()
    .then(function(pokemon){
        temp['pokemon'] = pokemon[0];
        return Evolution.find({ Evolution : pokemon[0]['PokemonId']}, { __v : 0, _id : 0 });
    })
    .then(function(evolution){
        if(evolution.length == 0){
            temp['evolution'] = evolution;
        }
        else{
            temp['evolution'] = evolution[0];
        }
        console.log(temp);

        res.render('pokemon', {pokemon : temp['pokemon'], evolution : temp['evolution']});
    });

});

module.exports = router;
