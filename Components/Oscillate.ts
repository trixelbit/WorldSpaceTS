import {Component} from "../Entities/Entity";
import {Vector3} from "../Math/Vector3";
import {View} from "../Views/View";


export class Oscillate extends Component
{
    public Amplitude : Vector3;
    
    public Frequency : number;
  
    public Offset: number;
    
    private _initialPosition : Vector3;
   
    
    public constructor(amplitude: Vector3, frequency: number, offset : number = 0)
    {
        super();
        this.Amplitude = amplitude;
        this.Frequency = frequency;
        this.Offset = offset;
    }
    
    public override Start()
    {
        this._initialPosition = this._entity.WorldPosition;
    }
    
    public override Update()
    {
        this._entity.WorldPosition = 
            new Vector3
            (
                this._initialPosition.x + this.Amplitude.x * Math.sin(this.Frequency * (View.ElapsedTime + this.Offset) ),
                this._initialPosition.y + this.Amplitude.y * Math.sin(this.Frequency * (View.ElapsedTime + this.Offset) ),
                this._initialPosition.z + this.Amplitude.z * Math.sin(this.Frequency * (View.ElapsedTime + this.Offset) ),
            );
    }
}