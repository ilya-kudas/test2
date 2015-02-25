var spawn = Game.spawns.Spawn1;

module.exports = function (creep) {
    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.WORK) > 0) {
        var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
        var source = _.sortBy(harvesters, function (n) { return Math.pow(creep.pos.x - n.pos.x, 2) + Math.pow(creep.pos.y - n.pos.y, 2); })[0];
        creep.moveTo(source);
        source.transferEnergy(creep)
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}