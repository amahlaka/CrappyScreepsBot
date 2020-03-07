
var support = require("support");
var JobTitle = require("classes").JobTitle;
var roles = require("roles");
var processing = false;
class Spawner{
    constructor(spawn, queue=["harvester","builder"]){
        this.spawn = Game.getObjectById(spawn)
        this.spawnQueue = queue;
        console.log("Constructed")
    }

    getRoles(){
        this.roleList = roles.generateRoles()
        return(true)
    }

    spawnHarvester(){
        this.spawnUnit(this.roleList["harvester"])
    }
    nextUnit(){

        return(true)
        this.currentUnit = this.roleList[this.spawnQueue[0]];
        console.log(this.currentUnit.name);
        if(this.spawnUnit(this.currentUnit)){
            this.roleList.shift();
            return(true);
        }
        else{
            console.log("Spawning failed");
            return(false);
        }
    }
    spawnUnit(unit){
        if (this.spawn.store.getUsedCapacity(RESOURCE_ENERGY) >= unit.cost){
        try {
                var SpawnString = unit.spawnString();
                this.spawn.spawnCreep(SpawnString);

        } catch (error) {
            console.log(error);
            return(false)
        }
           return(true);

    }
    return(false);
    }
    runTest(){
        for( var x in this.roleList){
            console.log(this.roleList[x].name);
            console.log(this.roleList[x].cost)
        }
    }

}


module.exports = {
Spawner: Spawner
};