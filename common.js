var spawn = Game.spawns.Spawn1;

function formation(creep, pp) {
    var inForm = _.some(pp, function (p) { return p.isEqualTo(creep.pos); })

    for (var n in pp) {
        var p = pp[n];
        if (p.isEqualTo(creep.pos))
            return;

        var w = spawn.room.lookForAt('terrain', p);
        if (w == 'wall')
            continue;

        var s = spawn.room.lookForAt('structure', p);
        if (s != undefined && s.structureType != Game.STRUCTURE_RAMPART)
            continue;

        var z = spawn.room.lookForAt('creep', p);
        if (z == undefined) {
            if (inForm) {
                if (creep.pos.isNearTo(p))
                    creep.moveTo(p);
                else
                    continue;
            }
            else
                creep.moveTo(p);
            return;
        }
    }
    creep.moveTo(Game.flags.Flag1);
}
