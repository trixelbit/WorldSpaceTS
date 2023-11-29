import {Component} from "../Entities/Entity";
import {Vector2} from "../Math/Vector2";

export class RectangleCollider extends Component
{
    public Size : Vector2;
    
    
    StartLogic(): void 
    {
        //this.Size = new Vector2(this._entity.Element.offsetWidth, this._entity.Element.offsetHeight);
    }

    UpdateLogic(): void 
    {
        
    }
    
    public IsPointInCollider(point: Vector2): boolean
    {
       let minX = this._entity.WorldPosition.x - this.Size.x;
       let maxX = this._entity.WorldPosition.x + this.Size.x;
       let minY = this._entity.WorldPosition.y - this.Size.y;
       let maxY = this._entity.WorldPosition.y + this.Size.y; 
       
       return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    }
    
}