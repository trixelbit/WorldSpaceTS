import {Component, Entity} from "../Entities/Entity";
import { Vector2 } from "../Math/Vector2";

export class BoxCollider extends Component
{
  private _size: Vector2;

  get Size(): Vector2
  {
    return this._size.Copy();
  }

  get Extents(): Vector2
  {
    return Vector2.Scale(this._size, 0.5);
  }


  constructor(entity: Entity, size: Vector2)
  {
    super();

    this._size = size;
  }


  get MinX(): number
  {
    return this._entity.WorldPosition.x - this.Extents.x;
  }

  get MaxX(): number
  {
    return this._entity.WorldPosition.x + this.Extents.x;
  }

  get MinY(): number
  {
    return this._entity.WorldPosition.y - this.Extents.y;
  }

  get MaxY(): number
  {
    return this._entity.WorldPosition.y + this.Extents.y;
  }


  static PointArrayForBounds(boxCollider: BoxCollider) : Vector2[]
  {
    var points = [ new Vector2(-1,0), new Vector2(-1,-1), new Vector2(0,1), new Vector2(1,1)];

    for( const point of points)
    {
      point.ScaleVector(boxCollider.Extents);
    }

    return points;
  }



  public IsPointInBounds(worldSpacePoint: Vector2) : boolean
  {
    return worldSpacePoint.x >= this.MinX && 
      worldSpacePoint.x <= this.MaxX &&
      worldSpacePoint.y >= this.MinY && 
      worldSpacePoint.y <= this.MaxY;
  }


  public DoesBoundIntersect(boxCollider: BoxCollider) : boolean
  {
    var pointsA = BoxCollider.PointArrayForBounds(this);
    var pointsB = BoxCollider.PointArrayForBounds(boxCollider);

    for(var point of pointsA)
    {
      if(this.IsPointInBounds(point))
      {
        return true;
      }
    }

    return false;
  }

  Start(): void {
  }

  Update(): void {
  }
}
