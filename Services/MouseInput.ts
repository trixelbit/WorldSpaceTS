import {Vector2} from "../Math/Vector2";
import {ScreenSpace} from "../Utilities/ScreenSpace";
import {Camera} from "./Camera";
import {Vector3} from "../Math/Vector3";

/**
 * @summary Contains Mouse information such as position, delta, and if mouse is pressed.
 */
export class MouseInput
{
    /**
     * @summary Return current pixel position of mouse. 
     */
    public static get Position() 
    {
        return this.s_position.Copy();
    }

    /**
     * @summary Returns the world space position of the mouse.
     */
    public static get WorldPosition() : Vector2
    {
        return Camera.WorldPosition.To2D().Add(this.Position);
        //return this.Position.Add(ScreenSpace.QuadrantSize).Subtract(Camera.WorldPosition.To2D()); 
    }

    /**
     * @summary The movement vector of the mouse between it's last position and current.
     */
    public static get PositionDelta()
    {
        return this.s_positionDelta;
    }

    /**
     * @summary Is the mouse current pressed. 
     */
    public static get IsPressed()
    {
        return this.s_isPressed;
    }
    
    private static s_position: Vector2 = new Vector2(0, 0);

    private static s_lastPosition: Vector2 = new Vector2(0, 0);
    
    private static s_positionDelta: Vector2 = new Vector2(0, 0);
    
    private static s_isPressed: boolean = false;
    
    
    public constructor()
    {
        document.addEventListener("mousemove", (e) => this.OnMouseMove(e));
        document.addEventListener("mousedown", (e) => this.OnMouseClick(e));
        document.addEventListener("mouseup" , (e) => this.OnMouseRelease(e));
    }
   
    private OnMouseMove(event: MouseEvent) : void
    {
        MouseInput.s_position = Vector2.Subtract(new Vector2(event.clientX, event.clientY), ScreenSpace.QuadrantSize);
        MouseInput.s_lastPosition = MouseInput.s_position.Copy();
        MouseInput.s_positionDelta = Vector2.Subtract(MouseInput.s_position, MouseInput.s_lastPosition);
    }
    
    private OnMouseClick(event: MouseEvent) : void
    {
        MouseInput.s_isPressed = true;
    }
    
    private OnMouseRelease(event: MouseEvent) : void
    {
        MouseInput.s_isPressed = false;
    }
}
