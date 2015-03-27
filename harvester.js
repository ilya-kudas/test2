var spawn = Game.spawns.Spawn1;
function distance(n) { return Math.pow(spawn.pos.x - n.pos.x, 2) + Math.pow(spawn.pos.y - n.pos.y, 2); }
var source = _.sortBy(spawn.room.find(Game.SOURCES), distance)[0];
//var source = spawn.pos.findClosest(Game.SOURCES);

module.exports = function (creep) {
    if (creep.energy > 0) {
        var harvesters = _.sortBy(_.filter(Game.creeps, { memory: { role: 'harvester' } }), distance);
        if (harvesters.length > 0) {
            var target = harvesters[0];
            if (!creep.pos.isNearTo(source))
                creep.transferEnergy(target);
            else if (target.energy < creep.energy)
                creep.transferEnergy(target, creep.energy - (target.energy + creep.energy) / 2);
        }
    }

    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.WORK) > 0) {
        creep.moveTo(source);
        creep.harvest(source);
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}