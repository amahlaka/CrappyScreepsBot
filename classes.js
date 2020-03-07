
class VisualClass{

  constructor(type, parent, vars = {}){
        this.type = type; 
        this.parent = parent.id;
        this.points = vars.points || {};
        this.position = vars.position || {x:0,y:0};
        this.scale = vars.scale || {x:0,y:0};
        this.endPosition = vars.endPosition || {x:0,y:0};
        this.text = vars.text || "ERROR"; 
        this.style = vars.style || {};
        this.visible = vars.visible || true;
        this.group = vars.group || "default";
    }
}
class SourceMap{
    constructor(id, distance){
        this.id = id;
        this.distance = distance
        if(Memory.mode=="DEBUG"){
        console.log("Distance between "+id+" and spawn: " + distance);
        }
    }
}

// WORKER = new JobTitle{ name:"worker",  abilities:["work","move","carry"], memory: {jobs:["build", "upgrade"], active_role:"upgrade", target: '', status: "recharging"} };
var support = require("support");

class JobTitle{
    constructor(name,abilities=[],jobs=[],role=name,target='',status="idle", cost = null){
        this.name = name;
        this.abilities = abilities;
        this.jobs = jobs;
        this.role = name;
        this.status= "idle";
        this.target = target;
        this.cost = cost || this.calculateCost();
    }
    getMemory(){
        return({"jobs":this.jobs, "role":this.role, "target":this.target, "status":this.status})
    }
    spawnString(){
        return(this.abilities,support.NameGenerator(this.name),this.getMemory())
    }
    calculateCost(){
        return(support.calculateCost(this.abilities));
    }
}

module.exports = {
    VisualClass: VisualClass,
    SourceMap: SourceMap,
    JobTitle
};
