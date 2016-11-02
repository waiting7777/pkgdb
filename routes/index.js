var Pokemon = require('../lib/db');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
    Pokemon.find({}, { PokemonId : 1, NameEn : 1, NameTw : 1, Type1 : 1, Type2 : 1, MaxCp : 1, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
        if(err) throw err;

        for(var i in pokemons){
            pokemons[i]['img'] = 'image/pokemon/' + pokemons[i]['PokemonId'] + '.png';
            pokemons[i]['type'] = pokemons[i]['Type1'] + ' ' + pokemons[i]['Type2'];
        }

        res.render('index', {pokemons : pokemons});
    });

});

module.exports = router;
