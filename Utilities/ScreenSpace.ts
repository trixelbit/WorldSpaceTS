import {View} from "../Views/View";
import {Vector2} from "../Vector2";

export class ScreenSpace
{
    public static PercentToPixelWidth(percent: number) : number
    {
        return (percent / 100) * this.ViewWidth;
    }

    public static PercentToPixelHeight(percent: number) : number
    {
        return (percent / 100) * this.ViewHeight;
    }

    public static get ViewWidth() : number
    {
        return window.innerWidth;
    }

    public static get ViewHeight() : number
    {
        return window.innerHeight;
    }
    
    public static get HalfWidth() : number
    {
        return ScreenSpace.ViewWidth / 2;
    }
    
    public static get HalfHeight() : number
    {
        
        return ScreenSpace.ViewHeight / 2;
    }
    
    public static get TopLeft() : Vector2
    {
        return new Vector2(0, 0);
    }
    
    public static get TopCenter() : Vector2
    {
        return new Vector2(this.HalfWidth, 0);
    }
    
    public static get TopRight() : Vector2
    {
        return new Vector2(this.ViewWidth, 0);
    }

    public static get BottomLeft() : Vector2
    {
        return new Vector2(0, this.ViewHeight);
    }

    public static get BottomCenter() : Vector2
    {
        return new Vector2(this.HalfWidth, this.ViewHeight);
    }

    public static get BottomRight() : Vector2
    {
        return new Vector2(this.ViewWidth, this.ViewHeight);
    }
    
    public static get  MiddleCenter() : Vector2
    {
        return new Vector2(this.HalfWidth, this.HalfHeight);
    }
    
    public static LandMarkToVector2(landmark : EScreenLandmark) : Vector2
    {
        switch(landmark)
        {
            case EScreenLandmark.TopLeft:
                return ScreenSpace.TopLeft;
            case EScreenLandmark.TopCenter:
                return ScreenSpace.TopCenter;
            case EScreenLandmark.TopRight:
                return ScreenSpace.TopRight;
                
            case EScreenLandmark.MiddleCenter:
                return ScreenSpace.MiddleCenter;
                
            case EScreenLandmark.BottomLeft:
                return ScreenSpace.BottomLeft;
            case EScreenLandmark.BottomCenter:
                return ScreenSpace.BottomCenter;
            case EScreenLandmark.BottomRight:
                return ScreenSpace.BottomRight;
        }
    }
}

export enum EScreenLandmark
{
    TopLeft,
    TopCenter,
    TopRight,
    MiddleCenter,
    BottomLeft,
    BottomCenter,
    BottomRight
}