
exports.idCheck = function(id, range){
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
