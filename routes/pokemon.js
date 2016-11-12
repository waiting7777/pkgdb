var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var Type = require('../lib/db_type');
var QuickMoveRelate = require('../lib/db_quickmoverelate');
var QuickMove = require('../lib/db_quickmove');
var ChargeMoveRelate = require('../lib/db_chargemoverelate');
var ChargeMove = require('../lib/db_chargemove');
var common = require('../lib/common');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bluebird = require('bluebird');

var type_map = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

mongoose.Promise = require('bluebird');

router.get('/:id', function(req, res, next) {

    var temp = [];
    var temp_type = [];
    var temp_type_s = [];
    var quickmove_array = [];

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
        console.log(temp);
        return QuickMoveRelate.find({ PokemonId : temp['pokemon']['PokemonId']}, { _id : 0, __v : 0 });

    })
    .then(function(quickmoverelate){
        var quickrelate_temp = [];
        for(var i = 0;i < quickmoverelate.length;i++){
            quickrelate_temp.push(quickmoverelate[i]['QuickMoveId']);
        }
        return QuickMove.find({ QuickMoveId : { $in : quickrelate_temp }}, { _id : 0, __v : 0 });

    })
    .then(function(quickmove){
        temp['quick'] = quickmove;
        return ChargeMoveRelate.find({ PokemonId : temp['pokemon']['PokemonId']}, { _id : 0, __v : 0 });
    })
    .then(function(chargemoverelate){
        var chargerelate_temp = [];
        for(var i = 0;i < chargemoverelate.length;i++){
            chargerelate_temp.push(chargemoverelate[i]['ChargeMoveId']);
        }
        return ChargeMove.find({ ChargeMoveId : { $in : chargerelate_temp }}, { _id : 0, __v : 0 });
    })
    .then(function(chargemove){
        temp['charge'] = chargemove;
        console.log(temp);
        res.render('pokemon', {pokemon : temp['pokemon'], evolution : temp['evolution'], types : temp_type_s, type_map : type_map, quick : temp['quick'], charge : temp['charge']});
    });
});

module.exports = router;
