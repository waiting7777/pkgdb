const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChargeMoveRelateSchema = new Schema({
    PokemonId : Number,
    ChargeMoveId : Number
});

var ChargeMoveRelate = mongoose.model('ChargeMoveRelate', ChargeMoveRelateSchema);

module.exports = ChargeMoveRelate;
