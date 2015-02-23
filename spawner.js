var spawn = Game.spawns.Spawn1;
var harvesters = _.filter(Game.creeps, {
    memory: { role: 'harvester' }
});

if (spawn.spawning == null && harvesters.length < 3) {
    spawn.createCreep([Game.WORK, Game.CARRY, Game.MOVE], null, { role: 'harvester' });
}