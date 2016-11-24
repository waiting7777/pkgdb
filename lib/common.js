function idCheck(id, range){
    if(isNaN(id)){
        console.log('Can\'t varify string');
        return false;
    }
    var temp_id = parseInt(id);

    if(id < 0 || id > range){
        console.log('Can\'t find pokemon');
        return false;
    }
}

function maxCpCalc(baseatk, basedef, basesta){
    var atk = baseatk + 15;
    var def = basedef + 15;
    var sta = basesta + 15;
    var cpm = 0.79030001;
    return Math.floor(atk * Math.sqrt(def) * Math.sqrt(sta) * cpm * cpm / 10);
}


exports.idCheck = idCheck;
exports.maxCpCalc = maxCpCalc;
