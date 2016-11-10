const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
    Type : String,
    Relate : Array
});

var Type = mongoose.model('Type', TypeSchema);

module.exports = Type;
