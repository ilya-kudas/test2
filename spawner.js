var spawn = Game.spawns.Spawn1;
var room = spawn.room;
var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
var hostiles = room.find(Game.HOSTILE_CREEPS);

if (hostiles.length > 0)
{
    spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK], null, { role: 'guard' });
}

else if (spawn.spawning == null && harvesters.length < 3)
{
    spawn.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, { role: 'harvester' });
}