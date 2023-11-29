import {Component} from "../Entities/Entity";
import {MouseInput} from "../Services/MouseInput";
import {Vector3} from "../Math/Vector3";
import {RectangleCollider} from "./RectangleCollider";
import {Vector2} from "../Math/Vector2";


export class Draggable extends Component
{
    private _isDraggingEnabled: boolean = false;
   
    private _isDragging: boolean = false;
 
    private _collider : RectangleCollider;
   
    private _clickOffset: Vector2;
    
    StartLogic(): void 
    {
        this._collider = this._entity.GetComponent<RectangleCollider>().Unwrap();
        
        document.onmousedown = (event: MouseEvent) => this.MouseDown(event);
        document.onmouseup = (event: MouseEvent) => this.Mouseup(event);
    }

    UpdateLogic(): void 
    {
        if(!this._isDraggingEnabled)
        {
            return;
        }
        
        console.log(`Mouse: ${MouseInput.Position.ToString()}  Entity Position: ${this._entity.WorldPosition.ToString()}  EntitySize: ${this._collider.Size.ToString()}`);
        
        if(this._isDragging)
        {
            this._entity.WorldPosition = new Vector3(
                MouseInput.WorldPosition.x - this._clickOffset.x,
                MouseInput.WorldPosition.y - this._clickOffset.y,
                this._entity.WorldPosition.z
            );
        }
    }
  
    public EnableDragging()
    {
        this._isDraggingEnabled = true;
    }
    
    public DisableDragging()
    {
        this._isDraggingEnabled = false;
    }
    
    public MouseDown(event: MouseEvent)
    {
        if(this._collider.IsPointInCollider(MouseInput.WorldPosition))
        {
            this._isDragging = true;
            this._clickOffset = MouseInput.WorldPosition.Subtract(this._entity.WorldPosition.To2D());
        }
    }
  
    private Mouseup(event: MouseEvent)
    {
        this._isDragging = false;
    }
}