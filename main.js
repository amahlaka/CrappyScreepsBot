var spawner = require("spawner");
var classes = require("classes");
var graph = require("graphics");
var actions = require("actions");
var paths = require("path");
function loop(){

    if(Memory.status != "ready" || Memory.stopped == true){
        return(false);
    }

    redraw(); // Redraw visuals
    var creeps = Game.creeps;
    for(var creep in creeps){

        actions.CheckForJobs(creeps[creep]);

    }
    try {
        spawner.SpawnList()
    } catch (error) {
        console.log(error)
    }
    



}
var JobTitle = require("classes").JobTitle;
var support = require("support");

function loadUnit(unitClass){
    var unit = Memory.roles[unitClass]
    console.log(JSON.stringify(unit))
    var spawnString = support.generateSpawnString(unit);
}

global.load = function(name){
    return(spawner.loadUnit(name))
}

global.path = function(){
    paths.findPaths();
}
global.init = function(mode = "normal"){
    console.log("Initializing...");
    if(require("init").init(mode)){
         Memory.status = "ready";
    }
}
global.pause = function(){
    Memory.stopped=true;
}
global.resume = function(){
    Memory.stopped=false;
}
global.abort = function(){
    throw new Error("Manual abort");
}

function redraw(){
    if(Memory.status == "ready" ){
        try {
            var visual = Memory.visuals;
            for(var visual in visual){
                graph.redraw(Memory.visuals[visual]);
            }
            return(true);
        } catch (error) {
            console.log(error);
            Memory.stopped=true;
            return(false);
        }
        
    }
}

module.exports =  {
 loop: loop
}