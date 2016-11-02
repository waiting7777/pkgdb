var type_map = {
    'Grass' : '草',
    'Poison' : '毒',
    'Fire' : '火',
    'Flying' : '飛行',
    'Water' : '水',
    'Bug' : '蟲',
    'Normal' : '普通',
    'Electric' : '電',
    'Ground' : '地',
    'Fairy' : '妖精',
    'Fighting' : '格鬥',
    'Psychic' : '超能力',
    'Rock' : '岩',
    'Steel' : '鋼',
    'Ice' : '冰',
    'Ghost' : '鬼',
    'Dragon' : '龍',
    'Dark' : '惡'
}

$(document).ready(function(){

    $('#pokemon-table').tablesorter({
        sortList : [[0,0]],
        headers : {
            1 : {
                sorter : false
            }
        }
    });

    console.log(123);

});
