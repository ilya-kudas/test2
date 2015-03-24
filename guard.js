var spawn = Game.spawns.Spawn1;

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

function sumTargets(pos)
{
    var sum = 0;
    var targets = pos.findInRange(Game.HOSTILE_CREEPS, 3);
    for (var t in targets) {
        if (pos.inRangeTo(t, 1)) {
            sum += 10;
        } else if (pos.inRangeTo(t, 2)) {
            sum += 4;
        } else {
            sum += 1;
        }
    }
    return sum;
}

var guards = _.filter(Game.creeps, { memory: { role: 'guard' } });
var pp = Game.flags.Flag2 ? getFormationPoints(Game.flags.Flag2.pos) : [];
var pl = _.filter(pp, function (n) { return spawn.room.lookForAt('creep', n) == undefined; });
for (var name in guards) {
    var creep = guards[name];

    if (Game.flags.Flag2) {
        if (pl.length > 0) {
            creep.moveTo(pl[0]);
        }
        else {
            creep.moveTo(Game.flags.Flag2);
        }
        continue;
    }
    else if (Game.flags.Flag1)
        creep.moveTo(Game.flags.Flag1);

    var sum = sumTargets(creep.pos);
    if (sum > 15) {
        creep.rangedMassAttack();
    } else {
        var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        if (target != null) {
            //creep.moveTo(target);
            creep.rangedAttack(target);
        }
    }

}