/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('support');
 * mod.thing == 'a thing'; // true
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function NameGenerator(type) {
    var NameString = type;
    while (true){
    var CustomName = NameString + getRandomInt(255);
    if (CustomName in Game.creeps === false){
        return CustomName;
        break;
        
    }
    return CustomName;
} 
} 

function calculateCost(abilities){
    console.log("Calculating Cost")
    var costMatrix = {"work": 100, "move": 50, "carry":50, "attack": 80, "heal": 250, "ranged_attack": 150, "tough":10, "claim": 600};
    var TOTAL_COST = 0;
    var costs = {}
    for( var ability of abilities ){
        var cost = costMatrix[ability]
        TOTAL_COST = TOTAL_COST + cost;
        costs[ability]=costMatrix[ability]
        if(Memory.mode =="DEBUG"){
            console.log(ability);
        }
    }
    
    if(Memory.mode =="DEBUG"){
        console.log(JSON.stringify(costs))
        console.log("TOTAL COST:" +TOTAL_COST);
    }
    return TOTAL_COST;
}


function generateSpawnString({name: name, abilities: abilities, jobs: jobs, role: role, target: target, status: status}){
    return([abilities,NameGenerator(name),{memory:{"jobs":jobs, "role":role, "target":target, "status":"idle"}}])
}


module.exports = {
getRandomInt: getRandomInt,
calculateCost: calculateCost,
generateSpawnString: generateSpawnString,
NameGenerator: NameGenerator
};