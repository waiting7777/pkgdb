var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var Cpm = require('../lib/db_cpm');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var common = require('../lib/common');

router.get('/', function(req, res, next){
    res.send('API v1.0');
});

router.get('/pokemon', function(req, res, next) {

    Pokemon.find({}, { PokemonId : 1, NameEn : 1, NameTw : 1, Type1 : 1, Type2 : 1, MaxCp : 1, BaseAtk : 1, BaseDef : 1, BaseSta : 1, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
        if(err) throw err;

        console.log(pokemons);
        res.send(pokemons);
    });
});

router.get('/pokemon/:id', function(req, res, next) {

    if(common.idCheck(req.params.id, 151) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    var id = parseInt(req.params.id);

    if(id == 0){
        Pokemon.find({}, { PokemonId : 1, NameEn : 1, NameTw : 1, Type1 : 1, Type2 : 1, MaxCp : 1, BaseAtk : 1, BaseDef : 1, BaseSta : 1, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
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

router.get('/evolution/:id', function(req, res, next) {

    if(common.idCheck(req.params.id, 151) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    var id = parseInt(req.params.id);

    if(id == 0){
        Evolution.find({}, { _id : 0, __v : 0}).exec(function(err, evolutions){
            if(err) throw err;

            res.send(evolutions);
            return;
        });
    }
    else{
        Evolution.find({ Evolution : id}, { __v : 0, _id : 0 }).exec(function(err, data){
            res.send(data)
        });
    }
});

router.get('/cpm', function(req, res, next){
    Cpm.find({}, { _id : 0, __v : 0}).exec(function(err, cpm){
        if(err) throw err;

        res.send(cpm);
        return;
    });
});

router.get('/cpm/:level', function(req, res, next){
    if(isNaN(req.params.level)){
        res.send(' ');
        return;
    }
    Cpm.find({ Level : req.params.level }, { _id : 0, __v : 0}).exec(function(err, cpm){
        if(err) throw err;

        res.send(cpm);
        return;
    });
});

router.get('/level', function(req, res, next){
    Cpm.find({}, { _id : 0, __v : 0}).exec(function(err, cpm){
        if(err) throw err;

        res.send(cpm);
        return;
    });
});

router.get('/level/:stardust', function(req, res, next){
    if(isNaN(req.params.stardust)){
        res.send(' ');
        return;
    }
    Cpm.find({ Stardust : req.params.stardust }, { _id : 0, __v : 0}).exec(function(err, cpm){
        if(err) throw err;

        res.send(cpm);
        return;
    });
});

module.exports = router;
