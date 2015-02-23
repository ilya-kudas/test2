var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var healer = require('healer');
require('spawner');

for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
        harvester(creep);
    }

    if (creep.memory.role == 'builder') {
        builder(creep);
    }

    if (creep.memory.role == 'guard') {
        guard(creep);
    }

    if (creep.getActiveBodyparts(Game.HEAL) > 0)
    {
        healer(creep);
    }
}