var support = require("support");
var JobTitle = require("classes").JobTitle;

function spawnUnit(unit){
    try {
        
    
    var spawn = Game.getObjectById(Memory.Home);
    console.log(unit.cost)
    if(unit.cost <= spawn.store.getUsedCapacity(RESOURCE_ENERGY)){
    var spawnString= support.generateSpawnString(unit)

        if(spawn.spawnCreep(spawnString[0],spawnString[1],spawnString[2])==0){
            Game.creeps[spawnString[1]].memory.maxAge = Game.creeps[spawnString[1]].ticksToLive
            return(true);
        }
        return(false)
    }
    return true;
} catch (error) {
    console.log("SpawnFail")
        console.log(error)
        return false;
}
}

function loadUnit(unitClass){
    var unit = Memory.roles[unitClass]
    //console.log(JSON.stringify(unit))
    return(spawnUnit(unit));
}

function SpawnList(){

    var LoadList = Memory.SpawnQueue
    if(LoadList != null && LoadList.length > 0){
        var unitID = LoadList[0]
    
    var spawn = Game.getObjectById(Memory.Home);
    var Power = spawn.store.getUsedCapacity(RESOURCE_ENERGY)
    var UnitCost = Memory.roles[unitID].cost
    if(UnitCost <= Power){
        if(loadUnit(unitID)){
            LoadList.shift();
            Memory.SpawnQueue=LoadList;
            console.log("Moving on");
        }
    }}
}

module.exports = {
    loadUnit: loadUnit,
    SpawnList: SpawnList
};

