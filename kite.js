var spawn = Game.spawns.Spawn1;

function getPositions(pos, step)
{
    var res = [];
    for (var i = pos.x - step; i <= pos.x + step; i++)
    {
        for (var j = pos.y - step; j <= pos.y + step; j++) {
            res.push(spawn.room.getPositionAt(i, j));
        }
    }

    return res;
}

module.exports = function (creep) {
    var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
    if (target != null) {
        var path = creep.pos.findPathTo(target);
        if (path.length > 16)
            if(Game.flags.Flag1)
                creep.moveTo(Game.flags.Flag1);
            else 
                creep.moveTo(spawn);
        else if (path.length > 3)
            creep.move(path[0].direction);
        else if (path.length > 2);
            // wait
        else if (path.length > 0) {
            creep.rangedAttack(target);
            creep.moveTo(spawn);
        }
    } else {
        
    }
}