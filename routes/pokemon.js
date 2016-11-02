var Pokemon = require('../lib/db_pokemon');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/:id', function(req, res, next) {

    if(isNaN(req.params.id)){
        res.send('Can\'t varify string');
        return;
    }
    var id = parseInt(req.params.id);

    if(id < 0 || id > 151){
        res.send('Can\'t find pokemon');
        return;
    }

    Pokemon.find({ PokemonId : id }, { _id : 0, __v : 0 }).exec(function(err, data){
        console.log(data[0]);
        res.render('pokemon', {pokemon : data[0]});
    });


});

module.exports = router;
