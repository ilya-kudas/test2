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

    var target = spawn.pos.findClosest(Game.HOSTILE_CREEPS);
    if (target != null)
        creep.rangedAttack(target);

    if (creep.hits / creep.hitsMax < 0.7)
    {
        creep.moveTo(spawn);
        return;
    }

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
            creep.moveTo(spawn);
        }
    } else {
        
    }
}