const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CpmSchema = new Schema({
    Level : Number,
    Cpm : Number,
    Stardust : Number
});

var Cpm = mongoose.model('Cpm', CpmSchema);

module.exports = Cpm;
