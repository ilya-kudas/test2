var spawn = Game.spawns.Spawn1;

module.exports = function (creep) {
    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
    if (target != null) {
        var path = creep.pos.findPathTo(target);
        if (path.length > 4)
            creep.move(path[0].direction);
        else if (path.length > 3);
            // wait
        else if (path.length > 0)
        {
            creep.rangedAttack(target);
            creep.moveTo(spawn);
        }
    }
}