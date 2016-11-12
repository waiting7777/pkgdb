const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuickMoveRelateSchema = new Schema({
    PokemonId : Number,
    QuickMoveId : Number
});

var QuickMoveRelate = mongoose.model('QuickMoveRelate', QuickMoveRelateSchema);

module.exports = QuickMoveRelate;
