var spawn = Game.getObjectById(Memory.Home)
function Renew(creep){
    if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
        creep.moveTo(spawn.pos);
    }
    if(creep.memory.status == "renew" && creep.ticksToLive >= creep.memory.maxAge-10 ){
        creep.say("🛏️ Fully Rested");
        creep.memory.status == "idle"
    }
}
function HarvestSource(creep){
    var target = Game.getObjectById(creep.memory.target);

    if(creep.harvest(target)==ERR_NOT_IN_RANGE){
        creep.moveTo(target.pos)
    }
    else{
        creep.say("⛏️" + creep.store.getUsedCapacity(RESOURCE_ENERGY) + "/" +creep.store.getCapacity(RESOURCE_ENERGY))
    }
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
        creep.memory.status = "full"
    }
}

function Recharge(creep){
    var target;
    if(spawn.store.getFreeCapacity(RESOURCE_ENERGY)== 0 ){
        target = FindExtension(creep);
    }
    else{
        target = spawn
    }
    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    else{
        creep.say("⚡ "+ creep.store.getUsedCapacity(RESOURCE_ENERGY) + "/" +creep.store.getCapacity(RESOURCE_ENERGY));
    }
}
var classes = require("classes");

function FindSource(creep){
    var target = creep.pos.findClosestByPath(FIND_SOURCES)
    if( target != null){
        creep.say("found Target");
        Memory.visuals.push(new classes.VisualClass("circle", Game.spawns['Spawn1'], {position:target.pos, style:{radius:0.5,stroke: "#FF0000", opacity:0.4, fill:'transparent'}}));
        creep.memory.target = target.id
        creep.memory.status = "harvest"
    }
}

function FindExtension(creep){
    var extensions = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    console.log('Spawn has '+extensions.length+' extensions available');
    if(extensions.length==0){
        BuildNew(creep)
    }
    for(var x in extensions){
        var ext = extensions[x]
        if( ext.store.getFreeCapacity(RESOURCE_ENERGY)!= 0){
            console.log("Free RealEstate")
            return(ext);
        }
    }
}


global.resetPath = function(){
    var creeps = Game.creeps;
    for (var x in creeps){

            creeps[x].memory.target = "";
            creeps[x].memory.status="search"
    }
}
function CheckForJobs(creep){


    var status = creep.memory.status;
    var FreeStorage = creep.store.getFreeCapacity()
    var TicksToLive = creep.ticksToLive;
    if(TicksToLive < 75 && status != "renew"){
        creep.memory.status=status="renew"
        creep.say("Moving to Renew");
    } 
    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && creep.memory.status != "harvest"){
        creep.memory.status = "search";
    }
    if(status == "idle"){
        switch(creep.memory.role){
            case "harvester":
                creep.memory.status="search"
                break;
            case "worker":
                creep.memory.status = "build"
        }
    }
    else{
        switch(status){
            case "search":
                FindSource(creep)
                break;
            case "harvest":
                HarvestSource(creep)
                break;
            case "full":
                if(creep.memory.role=="harvester"){
                Recharge(creep);
                }
                else if(creep.memory.role=="worker"){
                    creep.memory.status = "build"
                }
                else if(creep.memory.role=="upgrader"){
                    creep.memory.status= "upgrade";
                }
                else if (creep.memory.role == "builder"){
                    creep.memory.status = "build"
                }
                break;
            case "build":
                BuildNew(creep);
                break;
            case "renew":
                Renew(creep);
            break;
            case "upgrade":
                Upgrade(creep);
                break;
                
        }
    }
}

function Upgrade(creep){
    if(creep.room.controller) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}


function BuildNew(creep){
    console.log("Build")
    var target = Game.getObjectById(creep.memory.target);
    console.log(target)
    if(creep.build(target)==ERR_INVALID_TARGET){
        findNewSite(creep);
    }

    if(target == null){
        console.log("NewSite")
        findNewSite(creep);
    }
    else{
    if(creep.build(target)== ERR_NOT_IN_RANGE){
        creep.moveTo(target.pos);
    }
    }
    

}
function findNewSite(creep){
    var site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    console.log(site)
    if(site != null  ) {
        creep.memory.target = site.id;
    }
    else{
        creep.memory.status = "upgrade"
    }
}

module.exports =  {
    CheckForJobs: CheckForJobs
   }