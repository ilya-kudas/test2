var spawn = Game.spawns.Spawn1;

var createRanged = function (number)
{
    var a = [];
    for (var i = 0; i < number; i++)
    {
        a.push(Game.RANGED_ATTACK);
    }
    
    return spawn.createCreep(a, null, { role: 'guard' })
}

if (spawn != null && spawn.spawning == null) {

    var room = spawn.room;
    var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
    var carriers = _.filter(Game.creeps, { memory: { role: 'carrier' } });
    var guards = _.filter(Game.creeps, { memory: { role: 'guard' } });
    var kites = _.filter(Game.creeps, { memory: { role: 'kite' } });
    var hostiles = _.filter(spawn.pos.findInRange(Game.HOSTILE_CREEPS, 16), function (c) { return spawn.pos.findPathTo(c).length > 30; });
    var healers = _.filter(guards, function (c) { return c.getActiveBodyparts(Game.HEAL) > 0; })

    if (hostiles.length > 0) {
        if (guards.length < 6) {
            if (kites.length < 1)
                spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], null, { role: 'kite' });
            else if (healers.length < 2)
                spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.HEAL], null, { role: 'guard' });
            else {
                if (createRanged(5) == Game.ERR_NOT_ENOUGH_ENERGY)
                    if (hostiles.length > guards.length && createRanged(4) == Game.ERR_NOT_ENOUGH_ENERGY)
                        if (guards.length == 0) createRanged(3);
            }
        }
        else {
            spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE], null, { role: 'guard' });
            //if (kites.length < 20)
            //    spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], null, { role: 'kite' });
        }
    }

    else if (harvesters.length < 2) {
        spawn.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], null, { role: 'harvester' });
    }

    else if (harvesters.length == 2 && carriers.length == 0) {
        spawn.createCreep([Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], null, { role: 'carrier' });
    }
}