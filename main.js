require('common');
var harvester = require('harvester');
var builder = require('builder');
var healer = require('healer');
var carrier = require('carrier');
var kite = require('kite');
require('spawner');
require('guard');

for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    //try {
        if (creep.getActiveBodyparts(Game.HEAL) > 0) {
            healer(creep);
        }

        if (creep.memory.role == 'harvester') {
            harvester(creep);
        }

        if (creep.memory.role == 'carrier') {
            carrier(creep);
        }

        if (creep.memory.role == 'builder') {
            builder(creep);
        }

        if (creep.memory.role == 'kite') {
            kite(creep);
        }

    //} catch (e) { }
}