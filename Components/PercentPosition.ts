import {Component} from "../Entities/Entity";
import {Vector3} from "../Math/Vector3";
import {Vector2} from "../Math/Vector2";
import {EScreenLandmark, ScreenSpace} from "../Utilities/ScreenSpace";

export class PercentPosition extends Component
{
    public Percent : number
    
    public Coordinate : Vector2;
    
    private _origin : EScreenLandmark;
  
    private _margin : number;
    
    public constructor(percent : number, coordinate : Vector2, origin : EScreenLandmark = EScreenLandmark.TopLeft, margin : number = 0)
    {
        super();
        this.Percent = percent;
        this.Coordinate = coordinate;
        this._origin = origin;
        this._margin = margin;
    }
    
    StartLogic(): void 
    {
        this.Entity.Element.style.width = ScreenSpace.PercentToPixelWidth(this.Percent) + "px";
        this.Entity.Element.style.height = ScreenSpace.PercentToPixelWidth(this.Percent) + "px";
    }

    UpdateLogic(): void 
    {
        //this._entity.WorldPosition = this.CalculatePosition();
        const position = this.CalculatePosition();
        
        this.Entity.Element.style.left = position.x + "px";
        this.Entity.Element.style.top = position.y + "px";
        
        this.Entity.Element.style.width = ScreenSpace.PercentToPixelWidth(this.Percent) + "px";
        this.Entity.Element.style.height = ScreenSpace.PercentToPixelWidth(this.Percent) + "px";
    }
    
    private CalculatePosition() : Vector3
    {
        const origin = ScreenSpace.LandMarkToVector2(this._origin);
        const transform = new Vector2(
            origin.x >= ScreenSpace.ViewWidth ? -1 : 1,
            origin.y >= ScreenSpace.ViewHeight ? -1 : 1
        );
        
        
        const cellSize = ScreenSpace.PercentToPixelWidth(this.Percent + this._margin);
        
        return new Vector3
        (
            (cellSize * this.Coordinate.x) + (transform.x * cellSize / 2) + origin.x,
            (cellSize * this.Coordinate.y) + (transform.y * cellSize) + origin.y, 
            0
        );
            
    }
   
}