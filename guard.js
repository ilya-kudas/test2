function getFormationPoints(pos) {
    var pp = [
        [0,0],
        [1,0],
        [-1,0],
        [2,0],
        [-2,0],
        [0,1],
        [1,1],
        [-1,1],
        [2,1],
        [-2,1]
    ];
    return pp.map(function (p) { return spawn.room.getPositionAt(pos.x + p[0], pos.y + p[1]); })
}

var guards = _.filter(Game.creeps, { memory: { role: 'guard' } });
for (var name in guards) {
    var creep = guards[name];

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

    if (sum > 15) {
        creep.rangedMassAttack();
    } else {
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        if (target != null) {
            //creep.moveTo(target);
            creep.rangedAttack(target);
        }
    }

    if (Game.flags.Flag1)
        creep.moveTo(Game.flags.Flag1);
}