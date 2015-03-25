module.exports = function (creep) {
    var targets = creep.pos.findInRange(Game.MY_CREEPS, 6, {
        filter: function (object) {
            return object.hits < object.hitsMax;
        }
    });
    if (targets.length > 0) {
        var target = targets[0];

        if (creep.pos.isNearTo(target)) 
            creep.heal(target);
        else 
            creep.rangedHeal(target);

        if (creep.hits / creep.hitsMax < 0.7)
            creep.moveTo(spawn);
        else if (creep.pos.findInRange(Game.HOSTILE_CREEPS, 3).length > 0)
            creep.moveTo(spawn);
        else
            creep.moveTo(target);
    }
    else if (creep.hits / creep.hitsMax < 0.7) 
        creep.moveTo(spawn);
    else if (creep.pos.findInRange(Game.HOSTILE_CREEPS, 3).length > 0)
        creep.moveTo(spawn);
}