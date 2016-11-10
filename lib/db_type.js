const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
    Type : String,
    Bug : Number,
    Dark : Number,
    Dragon : Number,
    Electric : Number,
    Fairy : Number,
    Fighting : Number,
    Fire : Number,
    Flying : Number,
    Ghost : Number,
    Grass : Number,
    Ground : Number,
    Ice : Number,
    Normal : Number,
    Poison : Number,
    Psychic : Number,
    Rock : Number,
    Steel : Number,
    Water : Number
});

var Type = mongoose.model('Type', TypeSchema);

module.exports = Type;
