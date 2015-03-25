var spawn = Game.spawns.Spawn1;

function getFormationPoints1(pos) {
    var pp = [
        [0, -1],
        [1, -1],
        [-1, -1]
    ];
    return pp.map(function (p) { return spawn.room.getPositionAt(pos.x + p[0], pos.y + p[1]); })
}

var pp1 = Game.flags.Flag2 ? getFormationPoints1(Game.flags.Flag2.pos) : [];

module.exports = function (creep) {
    var com = require('common');
    var targets = _.sortBy(creep.pos.findInRange(Game.MY_CREEPS, 3, {
        filter: function (object) {
            return object.hits < object.hitsMax;
        }
    }), function (object) { return object.hits - object.hitsMax; });
    if (targets.length > 0) {
        var target = targets[0];

        if (creep.hits / creep.hitsMax < 0.7 || creep.pos.findInRange(Game.HOSTILE_CREEPS, 3).length > 0) 
            creep.moveTo(spawn);
        else
            creep.moveTo(target);

        if (creep.pos.isNearTo(target)) 
            creep.heal(target);
        else 
            creep.rangedHeal(target);
    }
    else if (creep.hits / creep.hitsMax < 0.7 || creep.pos.findInRange(Game.HOSTILE_CREEPS, 3).length > 0) 
        creep.moveTo(spawn);
    else if (Game.flags.Flag2)
        com.formation(creep, pp1);
}