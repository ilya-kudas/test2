module.exports = function (creep) {
    /*
    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
    if (target != null) {
        creep.moveTo(target);
        creep.rangedAttack(target);
    }
    */
    var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
    if (targets.length > 0) {
        creep.rangedMassAttack();
    }
}