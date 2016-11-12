const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChargeMoveSchema = new Schema({
    ChargeMoveId : Number,
    NameEn : String,
    NameTw : String,
    Type : String,
    Charge : Number,
    Damage : Number,
    Damage_STAB : Number,
    ColdDown : Number,
    DPS : Number,
    DPS_STAB : Number,
    Dodge : Number
});

var ChargeMove = mongoose.model('ChargeMove', ChargeMoveSchema);

module.exports = ChargeMove;
