
var JobTitle=require("classes").JobTitle;


function generateRoles(){
    var WORKER = new JobTitle("worker",["work","move","carry"],["build", "upgrade"]);
    var BUILDER = new JobTitle("builder",["work","move","carry"],["build"]);
    var UPGRADER = new JobTitle("upgrader",["work","move","carry"],["upgrade"]);
    var HARVESTER = new JobTitle("harvester",["work","move","carry"],["charge","upgrade"]);
    var MELEE_FIGHTER = new JobTitle("melee_fighter",["attack","attack","move"],["fight"]);
    var ARCHER = new JobTitle("archer",["ranged_attack","move"],["fight"]);
    var HEALER = new JobTitle("healer",["move","heal"],["heal"]);
    return({"worker":WORKER,"harvester":HARVESTER,"melee_fighter":MELEE_FIGHTER,"archer": ARCHER,"healer":HEALER, "upgrader":UPGRADER, "builder":BUILDER})
}

module.exports = {
    generateRoles: generateRoles
};