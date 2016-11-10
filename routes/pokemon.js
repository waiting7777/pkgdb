var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var Type = require('../lib/db_type');
var common = require('../lib/common');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bluebird = require('bluebird');

var type_map = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

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
        return Type.find({ $or: [ { Type : temp['pokemon']['Type1'] }, {Type : temp['pokemon']['Type2'] } ] }, { _id : 0, __v : 0 });
    })
    .then(function(type){
        var temp_type = [];
        var temp_type_s = [];

        for(var i=0;i < type[0]['Relate'].length;i++){
            temp_type[i] = 0;
        }
        for(var i in type){
            for(var j = 0;j < type[i]['Relate'].length;j++){
                temp_type[j] += parseInt(type[i]['Relate'][j]);
            }
        }
        for(var i=0;i < type[0]['Relate'].length;i+=3){
            temp_type_s.push(temp_type.slice(i, i+3))
        }
        console.log(temp_type_s);
        res.render('pokemon', {pokemon : temp['pokemon'], evolution : temp['evolution'], types : temp_type_s, type_map : type_map});
    });

});

module.exports = router;
