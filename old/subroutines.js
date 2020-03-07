function Harvest(creep){

    var sources = creep.pos.findClosestByRange(FIND_SOURCES);

        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffff00'}});
        }
}

function HarvestRuin(creep){
    var sources = creep.pos.findClosestByRange(FIND_RUINS,{filter: function(object){ return object.store.getUsedCapacity(RESOURCE_ENERGY) != 0}})
    if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources);
}
if(sources.store.getUsedCapacity(RESOURCE_ENERGY)==0){

}
}
function Upgrade(creep){
Build(creep)
//    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
 //               creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
  //  }
}
function RechargeSpawn(creep){
    var Target = creep.room.find(FIND_MY_SPAWNS)[0]
    console.log("chargingSpawn")
    if(creep.transfer(Target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
    creep.moveTo(Target);
    }
    if(Target.store.getFreeCapacity(RESOURCE_ENERGY)==0){
        Upgrade(creep);
    }
}

function Build(creep){
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000ff'}});
                }
            
}

module.exports = {

Harvest: Harvest,
Upgrade: Upgrade,
RechargeSpawn: RechargeSpawn,
Build: Build
};