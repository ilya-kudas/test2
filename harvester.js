var spawn = Game.spawns.Spawn1;
//var source = _.sortBy(spawn.room.find(Game.SOURCES), function (n) { return Math.pow(spawn.pos.x - n.pos.x, 2) + Math.pow(spawn.pos.y - n.pos.y, 2); })[0];
var source = spawn.pos.findClosest(Game.SOURCES);

module.exports = function (creep) {
    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.WORK) > 0) {
        creep.moveTo(source);
        creep.harvest(source);
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}