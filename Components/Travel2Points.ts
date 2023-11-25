import { Vector2 } from '../Math/Vector2';
import {Vector3} from "../Math/Vector3";
import {Component} from "../Entities/Entity";

export class Travel2Points extends Component
{
  private _scrollSpeed: Vector3;
  
  private _startPoint: Vector3;
  
  private _endPoint: Vector3;


  private get ImageElement() : HTMLImageElement
  {
    return this._entity.Element as HTMLImageElement;
  }
  
  /**
   * @param startPoint
   * @param scrollSpeed {Vector2} Scroll vector.
   **/
  public constructor(startPoint: Vector3, endPoint: Vector3, scrollSpeed: Vector3)
  {
    super();
    this._scrollSpeed = scrollSpeed;
    this._startPoint = startPoint;
    this._endPoint = endPoint;
  }
  
  public override Start()
  {
  }

  public override Update()
  {
    this._entity.WorldPosition = Vector3.Add(this._entity.WorldPosition, this._scrollSpeed);

    if(Vector3.Distance(this._entity.WorldPosition, this._endPoint) < this._scrollSpeed.Magnitude())
    {
      this._entity.WorldPosition = this._startPoint;
    }
  }
}
