var Quickmove = require('../lib/db_quickmove');
var QuickMoveRelate = require('../lib/db_quickmoverelate');
var Chargemove = require('../lib/db_chargemove');
var ChargeMoveRelate = require('../lib/db_chargemoverelate');
var Pokemon = require('../lib/db_pokemon');
var common = require('../lib/common');
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

router.get('/quick/:id', function(req, res, next){

    var temp = [];

    if(common.idCheck(req.params.id, 41) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    var id = parseInt(req.params.id);

    Quickmove.find({ QuickMoveId : {$in : [id-1, id, id+1]} }, { _id : 0, __v : 0 }).exec()
    .then(function(quickmove){
        if(id == 1){
            temp['quickmove'] = quickmove[0];
            temp['next'] = quickmove[1]['NameTw'];
        }
        else if(id == 41){
            temp['quickmove'] = quickmove[1];
            temp['prev'] = quickmove[0]['NameTw'];
        }
        else{
            temp['quickmove'] = quickmove[1];
            temp['prev'] = quickmove[0]['NameTw'];
            temp['next'] = quickmove[2]['NameTw'];
        }
        return QuickMoveRelate.find({ QuickMoveId : id }, { _id : 0, __v : 0 })
    })
    .then(function(quickmoverelate){
        var pokemon_temp = [];
        for(var i = 0;i < quickmoverelate.length;i++){
            pokemon_temp.push(quickmoverelate[i]['PokemonId']);
        }
        return Pokemon.find({ PokemonId : { $in : pokemon_temp }}, { _id : 0, __v : 0 }).sort( { MaxCp : -1 });

    })
    .then(function(pokemons){
        console.log(pokemons)
        res.render('quick_skill', {quick : temp['quickmove'], prev : temp['prev'], next : temp['next'], pokemon : pokemons });
    })
});

router.get('/charge', function(req, res, next){
    Chargemove.find({}, { _id : 0, __v : 0}).exec()
    .then(function(chargemoves){
        res.render('charge_index', {charges : chargemoves});
    });
});

router.get('/charge/:id', function(req, res, next){

    var temp = [];

    if(common.idCheck(req.params.id, 41) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    var id = parseInt(req.params.id);

    Chargemove.find({ ChargeMoveId : {$in : [id-1, id, id+1]} }, { _id : 0, __v : 0 }).exec()
    .then(function(chargemove){
        if(id == 1){
            temp['chargemove'] = chargemove[0];
            temp['next'] = chargemove[1]['NameTw'];
        }
        else if(id == 41){
            temp['chargemove'] = chargemove[1];
            temp['prev'] = chargemove[0]['NameTw'];
        }
        else{
            temp['chargemove'] = chargemove[1];
            temp['prev'] = chargemove[0]['NameTw'];
            temp['next'] = chargemove[2]['NameTw'];
        }
        return ChargeMoveRelate.find({ ChargeMoveId : id }, { _id : 0, __v : 0 })
    })
    .then(function(chargemoverelate){
        var pokemon_temp = [];
        for(var i = 0;i < chargemoverelate.length;i++){
            pokemon_temp.push(chargemoverelate[i]['PokemonId']);
        }
        return Pokemon.find({ PokemonId : { $in : pokemon_temp }}, { _id : 0, __v : 0 }).sort( { MaxCp : -1 });

    })
    .then(function(pokemons){
        console.log(pokemons)
        res.render('charge_skill', {charge : temp['chargemove'], prev : temp['prev'], next : temp['next'], pokemon : pokemons });
    })
});

module.exports = router;
