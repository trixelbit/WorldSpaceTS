import {Entity} from "./Entity";
import { Vector2 } from "../Vector2";
import {Vector3} from "../Vector3";

export class ImageElement extends Entity
{

  public get ImageElement() : HTMLImageElement
  {
    return this.Element as HTMLImageElement;
  }

  public constructor(name: string, imageSource: string, position: Vector3 = Vector3.Zero())
  {
    super("img", name, position);
    //this._element.style.imageRendering = "pixelated";
    this.Element.style.objectFit = "cover";
    this.Element.draggable = false;
    this.SetSprite(imageSource);
  }
}
