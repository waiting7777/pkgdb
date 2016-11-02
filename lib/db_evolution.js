const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EvolutionSchema = new Schema({
    Evolution : Array,
    Candy : Array
});

var Evolution = mongoose.model('Evolution', EvolutionSchema);

module.exports = Evolution;
