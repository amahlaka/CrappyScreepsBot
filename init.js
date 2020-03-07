

function init(mode){
    if(mode == "HARD"){
        console.log("HARD RESET");
        genocide()
    }
    if(mode == "DEBUG"){
        console.log("Starting in debug mode!");
    }
    Memory.status = "init";
    if(initMemory(mode)){
    if(initRoom()){
        console.log("Startup Finished...");
        return(true);
    }
}
    else{
        return(false);
    }


}

function genocide(){
    var creeps = Game.creeps;
    for(var x in creeps){
        creeps[x].say("💀 Good-bye!")
        creeps[x].suicide();
    }
    return(true);
}
function initRoom(){
    var Spawns = Game.spawns
    Memory.status = "room";
    for(var x in Spawns){
        initSpawn(Game.spawns[x]);
    }
    return(true);
    
}


function initMemory(mode){
    if(mode =="HARD"){
        Memory.creeps = {}
    }
    Memory.roles = {}
    Memory.status = "memory"
    Memory.SourceMap = [];
    Memory.Home = "";
    Memory.visuals = [];
    Memory.mode = mode;
    Memory.stopped = false;
    Memory.building = {}
    Memory.building.queue = []
    Memory.building.dict = {}

    Memory.Initialized = false;
    for(var x in Game.flags){
        Game.flags[x].remove;
    }
    populateRoles();
    Memory.SpawnQueue = ["harvester", "harvester", "worker"]
    return(true);
}

function populateRoles(){
    var JobTitle = require("classes").JobTitle;
    var roles = require("roles");
    var allRoles = roles.generateRoles()
    for(var x in allRoles){
        Memory.roles[allRoles[x].name] = allRoles[x]
    }
    return(true);

}


function initSpawn(spawn){
    var classes = require("classes");
    Memory.status = "spawn";
    var sources = spawn.room.find(FIND_SOURCES)
    for(var y in sources){
        var source = sources[y];
        var dist = spawn.pos.getRangeTo(source.pos);
        var visualObject = new classes.VisualClass("line", spawn, {position: spawn.pos, endPosition: source.pos, visible: false, group: "sources"});
        //Memory.visuals.push(visualObject);
        Memory.SourceMap.push(new classes.SourceMap(source, dist))
    }
    var Nearest = spawn.pos.findClosestByPath(FIND_SOURCES);
    spawn.room.createFlag(Nearest.pos, 'Closest');
    Memory.Home = spawn.id;
    return(true);
}



module.exports =  {
    init: init
   }