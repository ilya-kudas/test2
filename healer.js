module.exports = function (creep) {
    var targets = creep.pos.findInRange(Game.MY_CREEPS, 3, {
        filter: function (object) {
            return object.hits < object.hitsMax;
        }
    });
    if (targets.length > 0) {
        var target = targets[0];
        creep.moveTo(target);
        if (creep.pos.isNearTo(target)) {
            creep.heal(target);
        }
        else {
            creep.rangedHeal(target);
        }
    }
}