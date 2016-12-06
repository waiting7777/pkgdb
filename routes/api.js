var Pokemon = require('../lib/db_pokemon');
var Evolution = require('../lib/db_evolution');
var Cpm = require('../lib/db_cpm');
var Quickmove = require('../lib/db_quickmove');
var QuickMoveRelate = require('../lib/db_quickmoverelate');
var Chargemove = require('../lib/db_chargemove');
var ChargeMoveRelate = require('../lib/db_chargemoverelate');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var common = require('../lib/common');

let logs=[{
    user_id : 0,
    type : 'arrival',
    time : 1480910400000
},
{
    user_id : 0,
    type : 'departure',
    time : 1480921200000
},
{
    user_id : 1,
    type : 'arrival',
    time : 1480906800000
},
{
    user_id : 1,
    type : 'departure',
    time : 1480924800000
},
{
    user_id : 2,
    type : 'arrival',
    time : 1480914000000
},
{
    user_id : 2,
    type : 'departure',
    time : 1480915800000
},
{
    user_id : 3,
    type : 'arrival',
    time : 1480912200000
},
{
    user_id : 3,
    type : 'departure',
    time : 1480926600000
},
{
    user_id : 4,
    type : 'arrival',
    time : 1480899600000
},
{
    user_id : 4,
    type : 'departure',
    time : 1480910400000
}];

router.get('/visitor', function(req, res, next){
    res.send(logs)
});

router.post('/visitor/max', function(req, res, next){
       let time_start = Number(req.body.start_time);
       let time_end = Number(req.body.end_time);
       let vistors_in_building = {};
       let max=0;


       logs.sort(function(a, b){
           return a.time - b.time;
       });

       let _count =function(){
           let c=0;
           for(let user_id in vistors_in_building){
               c++;
           }

           return c;
       };

       for(let i=0,imax=logs.length; i<imax; i++){
            let l = logs[i];

            if( l.time > time_end ){
                console.log('break')
                break;
            }

            if( l.time >= time_start){
                 max = Math.max(max, _count() );
            }

            if(l.type === 'departure'){
                 delete vistors_in_building[l.user_id];
            }

            if(l.type === 'arrival'){
                 vistors_in_building[l.user_id] = l.time;
            }

            if( l.time >= time_start){
                 max = Math.max(max, _count() );
            }
            console.log(l.time, time_start, time_end)
            console.log(i, vistors_in_building)
            console.log('####' + max + '####')
        }


        if(max === 0 ){
            max = Math.max( max, _count() );
        }

        res.send(max.toString());
});

router.post('/visitor/create', function(req, res, next){
    console.log(req.body);
    logs.push({
        user_id:req.body.user_id,
        type:req.body.type,
        time:req.body.time
    });
    res.send('success');
});

router.post('/visitor/delete', function(req, res, next){
    for(var i in logs){
        if(logs[i]['user_id'] == req.body.user_id && logs[i]['type'] == req.body.type){
            logs.splice(i, 1);
        }
    }
    res.send('success');
});

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
        Pokemon.find({}, { __v : 0, _id : 0}).sort({ PokemonId : 1 }).exec(function(err, pokemons){
            if(err) throw err;

            res.setHeader('Access-Control-Allow-Origin','*');
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

router.get('/skill', function(req, res, next){
    var temp = [];
    Quickmove.find({}, {  _id : 0, __v : 0 }).exec()
    .then(function(quickmoves){
        temp['quick'] = quickmoves;
        return Chargemove.find({}, { _id : 0, __v : 0})
    })
    .then(function(chargemoves){
        temp['charge'] = chargemoves;
        res.send({quick : temp['quick'], charge : temp['charge']});
    });
});

router.get('/skill/quick', function(req, res, next){
    Quickmove.find({}, { _id : 0, __v : 0}).exec()
    .then(function(quickmoves){
        res.send(quickmoves);
    });
});

router.get('/skill/quick/:id', function(req, res, next){

    if(common.idCheck(req.params.id, 41) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    Quickmove.find({ QuickMoveId : req.params.id }, { _id : 0, __v : 0 }).exec()
    .then(function(quickmove){
        res.send(quickmove);
    })
});

router.get('/skill/charge', function(req, res, next){
    Chargemove.find({}, { _id : 0, __v : 0}).exec()
    .then(function(chargemoves){
        res.send(chargemoves);
    });
});

router.get('/skill/charge/:id', function(req, res, next){

    if(common.idCheck(req.params.id, 83) == false){
        res.render('error', {
            message: 'ERROR',
            error: 'ERROR'
        });
        return;
    }

    Chargemove.find({ ChargeMoveId : req.params.id }, { _id : 0, __v : 0 }).exec()
    .then(function(chargemove){
        res.send(chargemove);
    })
});

module.exports = router;
