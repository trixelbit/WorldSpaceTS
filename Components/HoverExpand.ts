import {Component} from "../Entities/Entity";
import {MathUtils} from "../Math/Math";

export class HoverExpand extends Component
{
    public NormalScale: number = 1;

    public ExpandedScale: number = 1.25;

    public StretchSpeed: number = 0.2;
    
    private _currentScale: number = 1;

    private _targetScale: number = 1;
   
    public constructor(imageElement: HTMLImageElement, normalScale: number = 1, expandedScale: number = 1.25, stretchSpeed: number = 0.2)
    {
        super();
        this.NormalScale = normalScale;
        this.ExpandedScale = expandedScale;
        this.StretchSpeed = stretchSpeed;
        
        imageElement.onmouseenter = (e) => this.OnMouseEnter(e);
        imageElement.onmouseleave = (e) => this.OnMouseLeave(e);
    }
    
    Start(): void 
    {
        
    }
    
    public override Update()
    {
        this._currentScale = MathUtils.Lerp(this._currentScale, this._targetScale, this.StretchSpeed);
        this._entity.Element.style.scale = this._currentScale.toString();
    }

    private OnMouseEnter(event: MouseEvent)
    {
        this._targetScale = this.ExpandedScale;
    }

    private OnMouseLeave(event: MouseEvent)
    {
        this._targetScale = this.NormalScale;
    }

}