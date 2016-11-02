const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
    PokemonId : Number,
    NameEn : String,
    NameTw : String,
    Type1 : String,
    Type2 : String,
    MaxCp : Number,
    BaseAtk : Number,
    BaseDef : Number,
    BaseSta : Number,
    CaptureRate : Number,
    FleeRate : Number,
    Weight : Number,
    Height : Number,
    Flavor : String
});

var Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
