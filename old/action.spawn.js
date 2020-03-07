/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('action.spawn');
 * mod.thing == 'a thing'; // true
 */
function QuickSpawn(type, spawner = 'Spawn1' ){
    var abilities = [];
    var CreepName = NameGenerator(type);
    var memoryVal = {mode: "charging", old_mode: ""};
    switch(type){
        case "harvester":
            abilities = [WORK,MOVE,CARRY];
            memoryVal.role = "harvester";
            break;

        case "builder":
            abilities = [WORK,MOVE,CARRY]
            memoryVal.role = "builder";
            memoryVal.action = "build";
            break;
            
        case "small_fighter":
            abilities = [MOVE, ATTACK, HEAL]
            memoryVal.role = "fighter";
            
        case "settler":
            abilities = [MOVE, ATTACK, CLAIM]
            memoryVal.role = "settler"
    }

    if (Game.spawns[spawner].canCreateCreep(abilities)==0){
        console.log('Can Spawn');
        var CreepSpawn = Game.spawns[spawner].spawnCreep(abilities, CreepName)
        if(CreepSpawn == 0){
            console.log("Created " + CreepName);
            Game.creeps[CreepName].memory=memoryVal;
        };
       
        
    }
        
            
    }
 

function TestSpawn(type, spawner = 'Spawn1'){
    var abilities=[];
     switch(type){
        case "harvester":
            abilities = [WORK,MOVE,CARRY];
            break;

        case "builder":
            abilities = [WORK,MOVE,CARRY]
            break;
            
        case "small_fighter":
            abilities = [MOVE, ATTACK, HEAL]
            break;
    }
    if(Game.spawns[spawner].canCreateCreep(abilities)==0){
        console.log("CanSpawn")
        return true;
      
    }
    else{
        console.log("CantSpawn")
        console.log(Game.spawns[spawner].canCreateCreep(abilities))
        return false;
         
    }
    
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
 
function NameGenerator(type) {
    var NameString = type;
    while (true){
    var CustomName = NameString + getRandomInt(255);
    if (CustomName in Game.creeps === false){
        console.log(CustomName);
        return CustomName;
        break;
        
    }
    return CustomName;
} 
} 

module.exports = {
    QuickSpawn: QuickSpawn,
    TestSpawn: TestSpawn

};