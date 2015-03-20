var spawn = Game.spawns.Spawn1;

module.exports = function (creep) {
    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.CARRY) > 0) {
        var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
        var ordered = _.sortBy(harvesters, function (n) { return Math.pow(creep.pos.x - n.pos.x, 2) + Math.pow(creep.pos.y - n.pos.y, 2); });
        var filtered = _.filter(ordered, function (n) { return n.energy > 10; });
        var source = filtered.length > 0 ? filtered[0] : ordered[0];
        if (!creep.pos.isNearTo(source))
            creep.moveTo(source);
        source.transferEnergy(creep)
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}