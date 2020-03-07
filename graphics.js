/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('graphics');
 * mod.thing == 'a thing'; // true
 */
function redraw(Visual){
        //console.log("Drawing")
        try {
            if(Memory.mode == "DEBUG"){
                console.log(Visual.type)
            }
        if(Visual.visible != true){
            return true;
        }
        switch(Visual.type){
            case "line":
                Game.getObjectById(Visual.parent).room.visual.line(Visual.position,Visual.endPosition,Visual.style);
                break;
            case "text":
                Game.getObjectById(Visual.parent).room.visual.text(Visual.text,Visual.position, Visual.style);
                break;
            case "rect":
                Game.getObjectById(Visual.parent).room.visual.rect(Visual.position,Visual.scale,Visual.style);
                break;
            case "circle":
                 Game.getObjectById(Visual.parent).room.visual.circle(Visual.position,Visual.style);
                 break;
            case "poly":
                 Game.getObjectById(Visual.parent).room.visual.poly(Visual.points,Visual.style);

            default:
                break;
        }
        return(true);
    } catch (error) {
            console.log(error);
            return(false);
    }
    }
module.exports = {
    redraw: redraw
};