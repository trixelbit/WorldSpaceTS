import {Component} from "../Entities/Entity";
import {MathUtils} from "../Math/Math";


export class FadeIn extends Component
{
    private _fadePercent: number = 0;
    private _opacity: number = 0;
   
    public constructor(fadePercent: number)
    {
        super();
        this._fadePercent = fadePercent;
    }
    
    public override Start()
    {
        this._entity.Element.style.opacity = "0";
    }
    
    public override Update()
    {
        this._opacity = MathUtils.Lerp(this._opacity, 1, this._fadePercent);
        this._entity.Element.style.opacity = this._opacity.toString();
    }
}