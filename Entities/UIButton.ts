import {AnchorButton} from "./AnchorButton";
import {HoverExpand} from "../Components/HoverExpand";
import {Vector3} from "../Math/Vector3";

export class UIButton extends AnchorButton
{
    public constructor(position: Vector3 = Vector3.Zero())
    {
        super(position);
        this.IsFixed = true;
        this.AddComponent(new HoverExpand(this.ImageElement));
    }
}