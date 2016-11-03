var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

router.get('/:id', function(req, res, next) {

    var temp = [];

    if(isNaN(req.params.id)){
        res.send('Can\'t varify string');
        return;
    }
    var id = parseInt(req.params.id);

    if(id < 0 || id > 151){
        res.send('Can\'t find pokemon');
        return;
    }

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
