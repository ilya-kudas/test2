var spawn = Game.spawns.Spawn1;

function getFormationPoints1(pos) {
    var pp = [
        [0, -1],
        [3, -1],
        [-3, -1]
    ];
    return pp.map(function (p) { return spawn.room.getPositionAt(pos.x + p[0], pos.y + p[1]); })
}

function requiresHealing(creep) { return creep.hits < creep.hitsMax; };
function healOrder(creep) { return creep.hits - creep.hitsMax; };
function findHealTargets(creep, range) {
    return _.sortBy(creep.pos.findInRange(Game.MY_CREEPS, 1, { filter: requiresHealing }), healOrder);
}
var pp1 = Game.flags.Flag2 ? getFormationPoints1(Game.flags.Flag2.pos) : [];

module.exports = function (creep) {
    var com = require('common');
    var targets = findHealTargets(creep, 1);
    if (targets.length == 0)
        targets = findHealTargets(creep, 3);
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