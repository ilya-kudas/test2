var spawn = Game.spawns.Spawn1;

module.exports = function (creep) {
    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.WORK) > 0) {
        var source = spawn.pos.findClosest(Game.SOURCES);
        creep.moveTo(source);
        creep.harvest(source);
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}