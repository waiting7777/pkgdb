const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuickMoveSchema = new Schema({
    QuickMoveId : Number,
    NameEn : String,
    NameTw : String,
    Type : String,
    Damage : Number,
    Damage_STAB : Number,
    ColdDown : Number,
    DPS : Number,
    DPS_STAB : Number,
    EPS : Number
});

var QuickMove = mongoose.model('QuickMove', QuickMoveSchema);

module.exports = QuickMove;
