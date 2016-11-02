var Pokemon = require('../lib/db_pokemon');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res, next){
    res.send('API v1.0');
});

router.get('/pokemon', function(req, res, next) {

    Pokemon.find({}, { PokemonId : 1, NameEn : 1, NameTw : 1, Type1 : 1, Type2 : 1, MaxCp : 1, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
        if(err) throw err;

        console.log(pokemons);
        res.send(pokemons);
    });
});

router.get('/pokemon/:id', function(req, res, next) {

    if(isNaN(req.params.id)){
        res.send('Can\'t varify string');
        return;
    }
    var id = parseInt(req.params.id);

    if(id < 0 || id > 151){
        res.send('Can\'t find pokemon');
        return;
    }
    if(id == 0){
        Pokemon.find({}, { PokemonId : 1, NameEn : 1, NameTw : 1, Type1 : 1, Type2 : 1, MaxCp : 1, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
            if(err) throw err;

            res.send(pokemons);
            return;
        });
    }
    else{
        Pokemon.find({ PokemonId : id }, { _id : 0, __v : 0 }).exec(function(err, data){
            res.send(data);
        });
    }
});

module.exports = router;
