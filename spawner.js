var spawn = Game.spawns.Spawn1;

if(spawn.spawning != null) return;

var room = spawn.room;
var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
var guards = _.filter(Game.creeps, { memory: { role: 'guard' } });
var hostiles = room.find(Game.HOSTILE_CREEPS);

if (hostiles.length > 0)
{
    if (guards.length == 2)
        spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.HEAL], null, { role: 'guard' });
    else
        spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK], null, { role: 'guard' });
}

else if (harvesters.length < 3)
{
    spawn.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, { role: 'harvester' });
}