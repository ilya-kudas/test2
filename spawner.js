var spawn = Game.spawns.Spawn1;

function createRanged(number) {
    var a = [];
    for (var i = 0; i < number; i++) {
        a.push(Game.RANGED_ATTACK);
    }

    return spawn.createCreep(a, null, { role: 'guard' })
}

function sum(array) {
    var res = 0;
    _.forEach(array, function (n) { res += n; });
    return res;
}

function createCreep(body, role) {
    var res = spawn.createCreep(body, null, { role: role });
    if (_.isString(res)) {
    }
    else {
        console.log('Spawn error: ' + res);
    }
}

function Spawn1() {
    if (Game.time % 4 != 0)
        return;

    if (spawn == null || spawn.spawning != null)
        return;

    var room = spawn.room;
    var builders = _.filter(Game.creeps, { memory: { role: 'builder' } });
    var harvesters = _.filter(Game.creeps, { memory: { role: 'harvester' } });
    var carriers = _.filter(Game.creeps, { memory: { role: 'carrier' } });
    var guards = _.filter(Game.creeps, { memory: { role: 'guard' } });
    var kites = _.filter(Game.creeps, { memory: { role: 'kite' } });
    var hostiles = _.filter(room.find(Game.HOSTILE_CREEPS), function (c) { return c.hits != 5000; });
    var hostilesNear = _.filter(spawn.pos.findInRange(Game.HOSTILE_CREEPS, 20), function (c) { return c.hits != 5000; });
    var healers = _.filter(guards, function (c) { return c.getActiveBodyparts(Game.HEAL) > 0; });
    //var gStatic = _.filter(guards, function (c) { return c.getActiveBodyparts(Game.MOVE) == 0; });
    //var gDynamic = _.filter(guards, function (c) { return c.getActiveBodyparts(Game.MOVE) > 0; });
    var gHealth = sum(_.pluck(guards, 'hits'));
    var hHealth = sum(_.pluck(hostiles, 'hits'));

    var w = Game.WORK;
    if ((hostilesNear.length > 0 && (gHealth / hHealth) < 2) || spawn.energy > 5000) {
        console.log(1);
        if (kites.length < 1 && guards.length < 2)
            createCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE], 'kite');
        else if (healers.length < 3 && guards.length / healers.length > 3)
            createCreep([HEAL, HEAL, HEAL, HEAL, MOVE], 'guard');
            /*
                    else if (guards.length < 6) {
                        if (createRanged(5) == Game.ERR_NOT_ENOUGH_ENERGY)
                            if (hostiles.length > guards.length && createRanged(4) == Game.ERR_NOT_ENOUGH_ENERGY)
                                if (guards.length == 0) createRanged(3);
                    }
            */
        else if (guards.length < 18) {
            createCreep([TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE], 'guard');
            //if (kites.length < 20)
            //    spawn.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK, Game.MOVE], null, { role: 'kite' });
        }
    }

    else if (harvesters.length >= 2 && carriers.length < 2) {
        console.log(2);
        createCreep([CARRY, CARRY, MOVE, MOVE], 'carrier');
    }

    else if (harvesters.length < 3) {
        console.log(3);
        createCreep([WORK, WORK, CARRY, MOVE], 'harvester');
    }
    else if (builders.length < 1 && room.find(Game.CONSTRUCTION_SITES).length > 0) {
        console.log(4);
        createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'builder' );
    } else {
        console.log('none of above');
    }
}

Spawn1();