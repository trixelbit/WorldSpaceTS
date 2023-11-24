import {MathUtils} from './Math';
import {Vector2} from "./Vector2";

export class Vector3
{
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
   
    public static From(vector : Vector2) : Vector3
    {
       return new Vector3(vector.x, vector.y, 0); 
    }
    
    public Add(vector: Vector3)
    {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    public static Add(a: Vector3, b: Vector3) : Vector3
    {
        this.ThrowIfVectorIsNull(a);
        this.ThrowIfVectorIsNull(b);

        return new Vector3(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z
        );
    };


    public Subtract(vector: Vector3)
    {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }

    public static Subtract(a: Vector3, b: Vector3): Vector3
    {
        this.ThrowIfVectorIsNull(a);
        this.ThrowIfVectorIsNull(b);

        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public Copy(): Vector3
    {
        return new Vector3(this.x, this.y, this.z);
    }

    public static Scale(value: Vector3, scale: number): Vector3
    {
        return new Vector3(value.x * scale, value.y * scale, value.z * scale);
    }

    public Scale(value: number): void
    {
        this.x *= value;
        this.y *= value;
        this.z *= value;
    }

    public ScaleVector(value: Vector3) : void
    {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
    }

    public static ScaleVector(a: Vector3, b:Vector3) : Vector3
    {
        return new Vector3(
            a.x *= b.x,
            a.y *= b.y,
            a.z *= b.z
        );
    }
    public Magnitude(): number
    {
        return Vector3.Distance(Vector3.Zero(), this);
    }

    public static Distance(a: Vector3, b: Vector3): number
    {
        return Math.sqrt
        (
            Math.pow(a.x - b.x, 2) + 
            Math.pow(a.y - b.y,2) +
            Math.pow(a.z - b.z, 2)
        );
    }

    static Lerp(a: Vector3, b: Vector3, p:number): Vector3
    {
        return new Vector3(
            MathUtils.Lerp(a.x, b.x, p),
            MathUtils.Lerp(a.y, b.y, p),
            MathUtils.Lerp(a.z, b.z, p)
        );
    }

    static Zero(): Vector3
    {
        return new Vector3(0,0, 0);
    }


    public static Normalized(vector: Vector3): Vector3
    {
        var magnitude = vector.Magnitude();

        if(magnitude === 0)
        {
            return Vector3.Zero();
        }
        return new Vector3(vector.x/magnitude, vector.y/magnitude, vector.z/magnitude);
    }

    public static Dot(a: Vector3, b: Vector3) : number
    {
        throw "NotImplemented";
    }

    private static ThrowIfVectorIsNull(value: Vector3, name: string = "vector")
    {
        if(value === null)
        {
            throw new Error("{name} is null");
        }
    }
};


