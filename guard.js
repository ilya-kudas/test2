module.exports = function (creep) {
    var sum = 0;
    var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
    for (var t in targets)
    {
        if (creep.pos.inRangeTo(t, 1)) {
            sum += 10;
        } else if (creep.pos.inRangeTo(t, 2)) {
            sum += 4;
        } else {
            sum += 1;
        }
    }

    if (sum > 10) {
        creep.rangedMassAttack();
    } else {
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        if (target != null) {
            creep.moveTo(target);
            creep.rangedAttack(target);
        }            
    }
}