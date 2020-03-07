var classes = require('classes')
function findPaths(){
    var spawn = Game.spawns['Spawn1']
    for(var x in Memory.SourceMap){
        var goal = Game.getObjectById(Memory.SourceMap[x].id.id)
        console.log(spawn.pos)
        console.log(goal.pos)
        var path = spawn.room.findPath(spawn.pos, goal.pos)
        console.log(path)
        var poly = new classes.VisualClass("poly",spawn,{points: path})
        Memory.visuals.push(poly);
    }
    
}
module.exports =  {
    findPaths: findPaths
   }