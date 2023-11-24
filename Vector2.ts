import {MathUtils} from './Math';
import {Vector3} from "./Vector3";

export class Vector2
{
  public x: number;
  public y: number;

  constructor(x: number, y: number)
  {
    this.x = x;
    this.y = y;
  }

  public Add(vector: Vector2)
  {
    this.x += vector.x;
    this.y += vector.y;
  }

  public static Add(a: Vector2, b: Vector2) : Vector2
  {
    this.ThrowIfVectorIsNull(a);
    this.ThrowIfVectorIsNull(b);

    return new Vector2(
      a.x + b.x,
      a.y + b.y
    );
  };


  public Subtract(vector: Vector2)
  {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  public static Subtract(a: Vector2, b: Vector2): Vector2
  {
    this.ThrowIfVectorIsNull(a);
    this.ThrowIfVectorIsNull(b);

    return new Vector2(a.x - b.x, a.y - b.y);
  }

  public Copy(): Vector2
  {
    return new Vector2(this.x, this.y); 
  }

  public To3D(): Vector3
  {
    return new Vector3(this.x, this.y, 0);
  }
  
  public static Scale(value: Vector2, scale: number): Vector2
  {
    return new Vector2(value.x * scale, value.y * scale);
  }

  public Scale(value: number): void
  {
    this.x *= value;
    this.y *= value;
  }

  public ScaleVector(value: Vector2) : void
  {
    this.x *= value.x;
    this.y *= value.y;
  }

  public Magnitude(): number
  {
    return Vector2.Distance(Vector2.Zero(), this);
  }

  public static Distance(a: Vector2, b: Vector2): number
  {
    return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y,2));
  }

  static Lerp(a: Vector2, b: Vector2, p:number): Vector2
  {
    return new Vector2(
      MathUtils.Lerp(a.x, b.x, p),
      MathUtils.Lerp(a.y, b.y, p));
  }

  static Zero(): Vector2
  {
    return new Vector2(0,0);
  }


  public static Normalized(vector: Vector2): Vector2
  {
    var magnitude = vector.Magnitude();

    if(magnitude === 0)
    {
      return Vector2.Zero();
    }
    return new Vector2(vector.x/magnitude, vector.y/magnitude);
  }

  public static Dot(a: Vector2, b: Vector2) : number
  {
    throw "NotImplemented";  
  }

  private static ThrowIfVectorIsNull(value: Vector2, name: string = "vector")
  {
    if(value === null)
    {
      throw new Error("{name} is null");
    }
  }
};


