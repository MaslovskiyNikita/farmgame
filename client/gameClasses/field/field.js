import GVAR from "../../globalVars/global.js";
import PlantMenu from "../plantMenu/plantMenu.js";
import Plant from "../plant/plant.js";
import ASSETS from "../../globalVars/assets.js";
import { ctx } from "../../globalVars/canvas.js";
import Buildable from "../building/buildable.js";

export default class Field extends Buildable{
    constructor(x, y, type)
    {
        super(x, y, type);
        this._image = ASSETS.pictures[type].image
        this._plant = "none";
    }
    draw(){
        if (this._isMoving){
            ctx.shadowBlur = 30;
            ctx.shadowColor = "rgb(0,230,0)"
        }
        ctx.drawImage(this._image, this._x, this._y, this._w, this._h);
        ctx.shadowBlur = 0;
    }
    onClick()
    {
        if (GVAR.UI[0] != null)
        {
            GVAR.UI.pop();
        }
        else if (this._plant == "none")
        {
            GVAR.UI.push(new PlantMenu(this._x, this._y, 30, 30));
        } else {
            this._plant.collect();
        }
    }
    createPlant(type)
    {
        this._plant = new Plant(this._x, this._y, this._w, this._h, type)
    }
    plantCollected()
    {
        this._plant = "none";
    }
    move(pos) {
        this._x = pos.x;
        this._y = pos.y;
        if (this._plant != "none"){
            this._plant.move(pos);
        }
    }
    update(){
        if (this._plant!="none")
            this._plant.updateGrowTime()
    }
}