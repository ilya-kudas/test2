var spawn = Game.spawns.Spawn1;
function distance(n) { return Math.pow(spawn.pos.x - n.pos.x, 2) + Math.pow(spawn.pos.y - n.pos.y, 2); }
var source = _.sortBy(spawn.room.find(Game.SOURCES), distance)[0];
//var source = spawn.pos.findClosest(Game.SOURCES);

module.exports = function (creep) {
    if (creep.energy < creep.energyCapacity && creep.getActiveBodyparts(Game.WORK) > 0) {
        creep.moveTo(source);
        creep.harvest(source);
        if (creep.energy > 0) {
            var a = _.filter(Game.creeps, { memory: { role: 'harvester' } });
            var b = _.difference(a, [creep.name]);
            console.log(a.length);
            var harvesters = _.sortBy(b, distance);
            if (harvesters.length > 0) {

                creep.transferEnergy(harvesters[0]);
            }
        }
    } else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn)
    }
}