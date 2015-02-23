module.exports = function (creep) {
    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
    if (target != null) {
        creep.moveTo(target);
        creep.rangedAttack(target);
    }
}