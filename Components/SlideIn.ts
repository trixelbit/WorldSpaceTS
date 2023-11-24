import {Component} from "../Entities/Entity";
import {Vector3} from "../Vector3";

export class SlideIn extends Component
{
    private _target : Vector3;
    
    private _startPoint : Vector3;
    
    private _lerpSpeed : number;
  
    private _offset : Vector3;
   
    
    public constructor(lerpSpeed: number, offset: Vector3)
    {
        super();
        this._lerpSpeed = lerpSpeed;
        this._offset = offset;
    }
    
    public override Start()
    {
        this._target = this._entity.WorldPosition;
        this._startPoint = Vector3.Add(this._entity.WorldPosition, this._offset);
        this._entity.WorldPosition = this._startPoint;
    }
    
    public override Update()
    {
        this._entity.WorldPosition = Vector3.Lerp(this._entity.WorldPosition, this._target, this._lerpSpeed);
    }
}