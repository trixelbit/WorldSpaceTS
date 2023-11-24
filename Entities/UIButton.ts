import {Vector3} from "../Vector3";
import {AnchorButton} from "./AnchorButton";
import {HoverExpand} from "../Components/HoverExpand";

export class UIButton extends AnchorButton
{
    public constructor(position: Vector3 = Vector3.Zero())
    {
        super(position);
        this.IsFixed = true;
        this.AddComponent(new HoverExpand(this.ImageElement));
    }
}