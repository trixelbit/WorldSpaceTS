import {Vector3} from "../Math/Vector3";
import {Vector2} from "../Math/Vector2";
import {MouseInput} from "./MouseInput";


export enum ECameraMode
{
    StaticPosition,
    Lerp,
    Orbit
}

// Static since only 1 camera instance should every exist.
export class Camera
{
    public static get WorldPosition() : Vector3
    {
        return Camera.s_worldPosition.Copy();
    }
    
    private static s_worldPosition: Vector3 = new Vector3(0, 0, 0);
  
    private static s_worldTarget: Vector3 = new Vector3(0, 0, 0);
  
    private static s_cameraMode: ECameraMode = ECameraMode.StaticPosition;

    private static s_lerpPercent: number = 0;
    
    
    public static SetTarget(position: Vector3)
    {
        this.s_worldTarget = position;
    }
    
    public static Update()
    {
        switch(this.s_cameraMode)
        {
            case ECameraMode.StaticPosition:
                Camera.s_worldPosition = Camera.s_worldTarget;
                break;
                
            case ECameraMode.Lerp:
                Camera.s_worldPosition = Vector3.Lerp( Camera.s_worldPosition, Camera.s_worldTarget, this.s_lerpPercent);
                break;
                
            case ECameraMode.Orbit:
                // Get the mouse coordinates from the event
                let dif: Vector2 = Vector2.Subtract(MouseInput.Position, Camera.s_worldTarget.To2D());
                const strength = dif.Magnitude() / 200;

                dif = Vector2.Normalized(dif);
                dif.Scale(30);
                dif.Scale(strength);

                Camera.s_worldTarget = dif.To3D();
                
                Camera.s_worldPosition = Vector3.Lerp( Camera.s_worldPosition, Camera.s_worldTarget, this.s_lerpPercent);
                break;

        }
    }
    
    public static SetOrbit(center: Vector3, lerpPercent: number)
    {
        this.s_cameraMode = ECameraMode.Orbit;
        this.s_worldTarget = center;
        this.s_lerpPercent = lerpPercent;
    }
    
    public static SetLerp(target: Vector3, lerpPercent: number)
    {
        this.s_cameraMode = ECameraMode.Lerp;
        this.s_lerpPercent = lerpPercent;
    }
    
    public static SetStaticPosition()
    {
        this.s_cameraMode = ECameraMode.StaticPosition;
    }
    
}

